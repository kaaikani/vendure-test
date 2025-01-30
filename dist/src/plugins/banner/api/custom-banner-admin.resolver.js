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
exports.CustomBannerAdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const custom_banner_entity_1 = require("../entities/custom-banner.entity");
const custom_banner_service_1 = require("../services/custom-banner.service");
let CustomBannerAdminResolver = class CustomBannerAdminResolver {
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
exports.CustomBannerAdminResolver = CustomBannerAdminResolver;
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Allow)(generated_types_1.Permission.SuperAdmin),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __param(2, (0, core_1.Relations)(custom_banner_entity_1.CustomBanner)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object, Array]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "customBanner", null);
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Allow)(generated_types_1.Permission.SuperAdmin),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __param(2, (0, core_1.Relations)(custom_banner_entity_1.CustomBanner)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object, Array]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "customBanners", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Transaction)(),
    (0, core_1.Allow)(generated_types_1.Permission.SuperAdmin),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "createCustomBanner", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Transaction)(),
    (0, core_1.Allow)(generated_types_1.Permission.SuperAdmin),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "updateCustomBanner", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Transaction)(),
    (0, core_1.Allow)(generated_types_1.Permission.SuperAdmin),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomBannerAdminResolver.prototype, "deleteCustomBanner", null);
exports.CustomBannerAdminResolver = CustomBannerAdminResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [custom_banner_service_1.CustomBannerService])
], CustomBannerAdminResolver);
