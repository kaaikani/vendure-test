import {
    PluginCommonModule,
    VendurePlugin,
    RequestContext,
    ID,
    Ctx,
  } from '@vendure/core';
  import {
    Args,
    Query,
    Resolver,
  } from '@nestjs/graphql';
  import { gql } from 'graphql-tag';
  import { ChannelService } from '@vendure/core/dist/service/services/channel.service';
  import { CustomerService } from '@vendure/core/dist/service/services/customer.service';
  import { UserService } from '@vendure/core/dist/service/services/user.service'; 
  import { Channel } from '@vendure/core';
  
  @Resolver()
  export class CustomerChannelResolver {
    constructor(
      private channelService: ChannelService,
      private customerService: CustomerService,
      private userService: UserService, // ✅ Inject here
    ) {}
  
    @Query(() => [Channel])
async getChannelsByCustomerEmail(
  @Ctx() ctx: RequestContext,
  @Args('email') email: string
): Promise<Channel[]> {
  const user = await this.userService.getUserByEmailAddress(ctx, email, 'customer');
  if (!user) {
    throw new Error('User not found with this email');
  }

  const customer = await this.customerService.findOneByUserId(ctx, user.id, false);
  if (!customer) {
    throw new Error('Customer not found for this user');
  }

  const customerWithChannels = await this.customerService.findOne(ctx, customer.id, ['channels']);
  if (!customerWithChannels?.channels) {
    return [];
  }

  const filteredChannels = customerWithChannels.channels.filter(
    channel => channel.code !== '__default_channel__'
  );

  return filteredChannels;
}

    
    
  }
  
  
  @VendurePlugin({
    imports: [PluginCommonModule],
    providers: [CustomerChannelResolver],
    compatibility: '^3.0.4',
    shopApiExtensions: {
      schema: gql`
      extend type Query {
  getChannelsByCustomerEmail(email: String!): [Channel!]!
}
      `,
      resolvers: [CustomerChannelResolver],
    },
  })
  export class CustomerChannelPlugin {}
  