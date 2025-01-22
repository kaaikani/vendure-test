var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BannerPlugin_1;
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import * as path from 'path';
import { adminApiExtensions, shopApiExtensions } from './api/api-extensions';
import { CustomBannerAdminResolver } from './api/custom-banner-admin.resolver';
import { BANNER_PLUGIN_OPTIONS } from './constants';
import { CustomBanner } from './entities/custom-banner.entity';
import { CustomBannerService } from './services/custom-banner.service';
import { CustomBannerShopResolver } from './api/custom-banner-shop.resolver';
let BannerPlugin = class BannerPlugin {
    static { BannerPlugin_1 = this; }
    static options;
    static init(options) {
        this.options = options;
        return BannerPlugin_1;
    }
    static ui = {
        id: 'banner-management-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'banner-management', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
};
BannerPlugin = BannerPlugin_1 = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        providers: [{ provide: BANNER_PLUGIN_OPTIONS, useFactory: () => BannerPlugin.options }, CustomBannerService],
        compatibility: '^3.0.0',
        entities: [CustomBanner],
        adminApiExtensions: {
            schema: adminApiExtensions,
            resolvers: [CustomBannerAdminResolver]
        },
        shopApiExtensions: {
            schema: shopApiExtensions,
            resolvers: [CustomBannerShopResolver], // Register Shop Resolver
        },
    })
], BannerPlugin);
export { BannerPlugin };
