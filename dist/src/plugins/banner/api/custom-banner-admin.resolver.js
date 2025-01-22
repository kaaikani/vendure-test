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
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from '@vendure/common/lib/generated-types';
import { Allow, Ctx, Relations, RequestContext, Transaction } from '@vendure/core';
import { CustomBanner } from '../entities/custom-banner.entity';
import { CustomBannerService } from '../services/custom-banner.service';
let CustomBannerAdminResolver = class CustomBannerAdminResolver {
    customBannerService;
    constructor(customBannerService) {
        this.customBannerService = customBannerService;
    }
    async customBanner(ctx, args, relations) {
        return this.customBannerService.findOne(ctx, args.id, relations);
    }
    async customBanners(ctx, args, relations) {
        return this.customBannerService.findAll(ctx, args.options || undefined, relations);
    }
    async createCustomBanner(ctx, input) {
        return this.customBannerService.create(ctx, input); // Use customBannerService here
    }
    async updateCustomBanner(ctx, args) {
        return this.customBannerService.update(ctx, args.input);
    }
    async deleteCustomBanner(ctx, args) {
        return this.customBannerService.delete(ctx, args.id);
    }
};
__decorate([
    Query(),
    Allow(Permission.SuperAdmin),
    __param(0, Ctx()),
    __param(1, Args()),
    __param(2, Relations(CustomBanner)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object, Array]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "customBanner", null);
__decorate([
    Query(),
    Allow(Permission.SuperAdmin),
    __param(0, Ctx()),
    __param(1, Args()),
    __param(2, Relations(CustomBanner)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object, Array]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "customBanners", null);
__decorate([
    Mutation(),
    Transaction(),
    Allow(Permission.SuperAdmin),
    __param(0, Ctx()),
    __param(1, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "createCustomBanner", null);
__decorate([
    Mutation(),
    Transaction(),
    Allow(Permission.SuperAdmin),
    __param(0, Ctx()),
    __param(1, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "updateCustomBanner", null);
__decorate([
    Mutation(),
    Transaction(),
    Allow(Permission.SuperAdmin),
    __param(0, Ctx()),
    __param(1, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "deleteCustomBanner", null);
CustomBannerAdminResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [CustomBannerService])
], CustomBannerAdminResolver);
export { CustomBannerAdminResolver };
