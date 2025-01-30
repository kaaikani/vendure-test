import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { ManualCustomerChannelPlugin } from './plugins/manualadmincustomerchannel/manualadmincustomerchannel.plugin';
import { BannerPlugin } from './plugins/banner/banner.plugin';

compileUiExtensions({
    outputPath: path.join(__dirname, '../admin-ui'),
    extensions: [
        // ManualCustomerChannelPlugin.ui,
        // {
        // id: 'manual-admin',
        // extensionPath: path.join(__dirname, 'plugins/manualadmincustomerchannel/ui'),
        // routes: [{ route: 'manualadmincustomerchannel', filePath: 'routes.ts' }],
        // providers: ['providers.ts'],
        // },
        // BannerPlugin.ui,
        // {
        // id: 'cms-banner',
        // extensionPath: path.join(__dirname, 'plugins/banner/ui'),
        // routes: [{ route: 'banner', filePath: 'routes.ts' }],
        // providers: ['providers.ts'],
        // },
    ],
})
    .compile?.()
    .then(() => {
        process.exit(0);
    });
