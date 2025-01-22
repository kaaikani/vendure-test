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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm"); // Updated decorator
const typeorm_2 = require("typeorm"); // Import DataSource instead of Connection
const banner_entity_1 = require("../entities/banner.entity");
const core_1 = require("@vendure/core"); // Import RequestContext
let BannerService = class BannerService {
    constructor(dataSource, // Use DataSource
    assetService) {
        this.dataSource = dataSource;
        this.assetService = assetService;
    }
    async getBannersByChannel(channelId) {
        return this.dataSource.manager.find(banner_entity_1.Banner, { where: { channelId } }); // Using dataSource
    }
    async createBanner(ctx, input) {
        const { channelId, enabled, assetIds } = input;
        // Use AssetService.findOne() to get assets by their IDs
        const assets = [];
        for (const assetId of assetIds) {
            const asset = await this.assetService.findOne(ctx, assetId); // Provide RequestContext
            if (asset) {
                assets.push(asset);
            }
        }
        const banner = new banner_entity_1.Banner();
        banner.channelId = channelId;
        banner.enabled = enabled;
        banner.assets = assets;
        await this.dataSource.manager.save(banner_entity_1.Banner, banner); // Save banner
        return banner;
    }
    async updateBanner(ctx, input) {
        const { id, enabled, assetIds } = input;
        const banner = await this.dataSource.manager.findOne(banner_entity_1.Banner, {
            where: { id }, // Correct format using `where` property
        });
        if (!banner) {
            throw new Error('Banner not found');
        }
        banner.enabled = enabled;
        // Use AssetService.findOne() to get assets by their IDs
        const assets = [];
        for (const assetId of assetIds) {
            const asset = await this.assetService.findOne(ctx, assetId); // Provide RequestContext
            if (asset) {
                assets.push(asset);
            }
        }
        banner.assets = assets;
        await this.dataSource.manager.save(banner_entity_1.Banner, banner);
        return banner;
    }
    async deleteBanner(ctx, id) {
        const banner = await this.dataSource.manager.findOne(banner_entity_1.Banner, { where: { id } });
        if (!banner) {
            throw new Error('Banner not found');
        }
        await this.dataSource.manager.remove(banner_entity_1.Banner, banner);
        return true;
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        core_1.AssetService])
], BannerService);
