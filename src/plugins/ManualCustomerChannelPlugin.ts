//ManualCustomerChannelPlugin.ts

import { Injectable } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'; // Import ID from @nestjs/graphql
import {
    Channel,
    ChannelService,
    Ctx,
    Customer,
    PluginCommonModule,
    RequestContext,
    VendurePlugin,
} from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import gql from 'graphql-tag';
import * as path from 'path';
import { Repository } from 'typeorm';

const schemaExtension = gql`
extend type Mutation {
    assignCustomerToChannels(customerId: ID!, channelIds: [ID!]!): String!
}
`;


@Injectable()
class CustomerChannelService {
    private customerRepository: Repository<Customer>;
    private defaultChannelId = '1';  // Set this to the actual ID of the default channel in your setup

    constructor(private channelService: ChannelService) {
        this.customerRepository = channelService['connection'].getRepository(Customer);
    }

    private async getCustomerAssignedChannels(ctx: RequestContext, customerId: string): Promise<string[]> {
        const customer = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: ['channels'],
        });

        if (!customer) {
            throw new Error(`Customer with ID ${customerId} not found.`);
        }

        return customer.channels.map((channel: Channel) => String(channel.id));
    }

    async assignCustomerToChannels(ctx: RequestContext, customerId: string, channelIds: string[]): Promise<string> {
        if (!customerId || !channelIds || channelIds.length === 0) {
            throw new Error("Customer ID and channel IDs are required and should not be empty.");
        }

        const currentChannelIds = await this.getCustomerAssignedChannels(ctx, customerId);

        // Exclude the default channel from channelsToRemove
        const channelsToRemove = currentChannelIds.filter(
            (id: string) => id !== this.defaultChannelId && !channelIds.includes(id)
        );

        if (channelsToRemove.length > 0) {
            await this.channelService.removeFromChannels(ctx, Customer, customerId, channelsToRemove);
        }

        await this.channelService.assignToChannels(ctx, Customer, customerId, channelIds);

        return `Customer with ID ${customerId} assigned to channels with IDs ${channelIds.join(', ')}`;
    }
}


@Resolver()
class ChannelAssignmentResolver {
    constructor(private customerChannelService: CustomerChannelService) {}

    @Mutation(() => String)
    async assignCustomerToChannels(
        @Ctx() ctx: RequestContext,
        @Args('customerId', { type: () => ID }) customerId: string,
        @Args('channelIds', { type: () => [ID] }) channelIds: string[],
    ): Promise<string> {
        return this.customerChannelService.assignCustomerToChannels(ctx, customerId, channelIds);
    }
}

@VendurePlugin({
    imports: [PluginCommonModule],
    compatibility: "3.0.4",
    adminApiExtensions: {
        schema: schemaExtension,
        resolvers: [ChannelAssignmentResolver],
    },
    providers: [CustomerChannelService],
})
export class ManualCustomerChannelPlugin {
    static ui: AdminUiExtension = {
        id: 'manual-customer-channel-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'manual-customer-channel', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}


