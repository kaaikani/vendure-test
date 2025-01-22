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
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RequestContext } from '@vendure/core';
import { CustomBannerService } from '../services/custom-banner.service';
let CustomBannerShopResolver = class CustomBannerShopResolver {
    customBannerService;
    constructor(customBannerService) {
        this.customBannerService = customBannerService;
    }
    async customBanners(channelId, // Accepts channelId from query
    ctx // Use RequestContext directly
    ) {
        return this.customBannerService.findByChannel(ctx, channelId);
    }
};
__decorate([
    Query(),
    __param(0, Args('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RequestContext // Use RequestContext directly
    ]),
    __metadata("design:returntype", Promise)
], CustomBannerShopResolver.prototype, "customBanners", null);
CustomBannerShopResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [CustomBannerService])
], CustomBannerShopResolver);
export { CustomBannerShopResolver };
