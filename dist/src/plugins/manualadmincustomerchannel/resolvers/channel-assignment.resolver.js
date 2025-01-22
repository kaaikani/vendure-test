var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { Ctx, RequestContext } from '@vendure/core';
import { CustomerChannelService } from '../services/customer-channel.service';
let ChannelAssignmentResolver = class ChannelAssignmentResolver {
    customerChannelService;
    constructor(customerChannelService) {
        this.customerChannelService = customerChannelService;
    }
    async assignCustomerToChannels(ctx, customerId, channelIds) {
        return this.customerChannelService.assignCustomerToChannels(ctx, customerId, channelIds);
    }
};
__decorate([
    Mutation(() => String),
    __param(0, Ctx()),
    __param(1, Args('customerId', { type: () => ID })),
    __param(2, Args('channelIds', { type: () => [ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, String, Array]),
    __metadata("design:returntype", Promise)
], ChannelAssignmentResolver.prototype, "assignCustomerToChannels", null);
ChannelAssignmentResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [CustomerChannelService])
], ChannelAssignmentResolver);
export { ChannelAssignmentResolver };
