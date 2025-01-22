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
import { Query, Resolver } from "@nestjs/graphql";
import { ChannelService, Ctx, PluginCommonModule, RequestContext, VendurePlugin } from "@vendure/core";
import gql from "graphql-tag";
const schemaExtension = gql `
extend type Query {
  getChannelList: [Channel!]!
}
`;
let ChannelResolver = class ChannelResolver {
    channelService;
    constructor(channelService) {
        this.channelService = channelService;
    }
    async getChannelList(ctx) {
        const result = await this.channelService.findAll(ctx);
        return result.items; // Access the items array from the PaginatedList
    }
};
__decorate([
    Query(),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "getChannelList", null);
ChannelResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [ChannelService])
], ChannelResolver);
let ChannelPlugin = class ChannelPlugin {
};
ChannelPlugin = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        compatibility: '^3.0.4',
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [ChannelResolver],
        },
        providers: [ChannelService],
    })
], ChannelPlugin);
export { ChannelPlugin };
