var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import * as path from 'path';
import { ChannelAssignmentResolver } from './resolvers/channel-assignment.resolver';
import { CustomerChannelService } from './services/customer-channel.service';
import gql from 'graphql-tag';
let ManualCustomerChannelPlugin = class ManualCustomerChannelPlugin {
    static ui = {
        id: 'manual-customer-channel-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'manual-customer-channel', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
};
ManualCustomerChannelPlugin = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        compatibility: "3.0.5",
        adminApiExtensions: {
            schema: gql `
            extend type Mutation {
                assignCustomerToChannels(customerId: ID!, channelIds: [ID!]!): String!
            }
        `,
            resolvers: [ChannelAssignmentResolver],
        },
        providers: [CustomerChannelService],
    })
], ManualCustomerChannelPlugin);
export { ManualCustomerChannelPlugin };
