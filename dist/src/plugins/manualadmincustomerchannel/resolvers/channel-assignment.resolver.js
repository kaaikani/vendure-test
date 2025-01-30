"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelAssignmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core");
const customer_channel_service_1 = require("../services/customer-channel.service");
let ChannelAssignmentResolver = class ChannelAssignmentResolver {
    constructor(customerChannelService) {
        this.customerChannelService = customerChannelService;
    }
    async assignCustomerToChannels(ctx, customerId, channelIds) {
        return this.customerChannelService.assignCustomerToChannels(ctx, customerId, channelIds);
    }
};
exports.ChannelAssignmentResolver = ChannelAssignmentResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)('customerId', { type: () => graphql_1.ID })),
    __param(2, (0, graphql_1.Args)('channelIds', { type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, String, Array]),
    __metadata("design:returntype", Promise)
], ChannelAssignmentResolver.prototype, "assignCustomerToChannels", null);
exports.ChannelAssignmentResolver = ChannelAssignmentResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [customer_channel_service_1.CustomerChannelService])
], ChannelAssignmentResolver);
