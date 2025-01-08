import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

import { adminApiExtensions } from './api/api-extensions';
import { CustomBannerAdminResolver } from './api/custom-banner-admin.resolver';
import { BANNER_PLUGIN_OPTIONS } from './constants';
import { CustomBanner } from './entities/custom-banner.entity';
import { CustomBannerService } from './services/custom-banner.service';
import { PluginInitOptions } from './types';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: BANNER_PLUGIN_OPTIONS, useFactory: () => BannerPlugin.options }, CustomBannerService],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
    entities: [CustomBanner],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [CustomBannerAdminResolver]
    },
})
export class BannerPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<BannerPlugin> {
        this.options = options;
        return BannerPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'banner-management-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'banner-management', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}
