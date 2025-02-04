import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import {
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  defaultPromotionConditions,
  defaultOrderProcess,
  dummyPaymentHandler,
} from '@vendure/core';
import { EmailPlugin, FileBasedTemplateLoader, defaultEmailHandlers } from '@vendure/email-plugin';
import 'dotenv/config';
import { orderCanceledNotificationProcess } from './customOrderProcess/order-canceled-notification-process';
import { productDeliveredNotificationProcess } from './customOrderProcess/product-delivered-notification-process';
import { CancelOrderPlugin } from './plugins/cancelOrderPlugin';
import { CheckUniquePhonePlugin } from './plugins/checkUniquePhonePlugin';
import { CustomEventPlugin } from './plugins/customEventPlugin';
import { CustomTokenPlugin } from './plugins/customTokenPlugin';
import { CollectionIsPrivatePlugin } from './plugins/collectionIsPrivate';
import { PromotionPlugin } from './plugins/promotionPlugin';
import { shouldApplyCouponcode } from './customPromotionConditions/shouldApply';
import { ChannelPlugin } from './plugins/channelPlugin';

import * as path from 'path';


const IS_DEV = process.env.APP_ENV === 'dev';


export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    ...(IS_DEV
      ? {
        adminApiPlayground: {
          settings: { 'request.credentials': 'include' } as any,
        },
        adminApiDebug: true,
        shopApiPlayground: {
          settings: { 'request.credentials': 'include' } as any,
        },
        shopApiDebug: true,
      }
      : {}),
  },
  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET,
    },
    requireVerification: false,
  },
  dbConnectionOptions: {
    type: 'mysql',
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
    logging: false,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  promotionOptions: {
    promotionConditions: [...defaultPromotionConditions, shouldApplyCouponcode],
  },
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets',
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templateLoader: new FileBasedTemplateLoader(path.join(__dirname, 'static/email/templates')), // ✅ Corrected
      globalTemplateVars: {
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: 'http://localhost:8080/verify',
        passwordResetUrl: 'http://localhost:8080/password-reset',
        changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
      },
    }),
    
    ChannelPlugin,
    CheckUniquePhonePlugin,
    PromotionPlugin,
    CancelOrderPlugin,
    CustomEventPlugin,
    CustomTokenPlugin,
    CollectionIsPrivatePlugin,
   

    AdminUiPlugin.init({
      port: 3000,
      route: "admin",
      // app: compileUiExtensions({
      //   outputPath: path.join(__dirname, '../admin-ui/dist'),
      //   extensions: [
      //     // ManualCustomerChannelPlugin.ui,
      //     // {
      //     //   id: 'manual-admin',
      //     //   extensionPath: path.join(__dirname, 'plugins/manualadmincustomerchannel/ui'),
      //     //   routes: [{ route: 'manualadmincustomerchannel', filePath: 'routes.ts' }],
      //     //   providers: ['providers.ts'],
      //     // },
      //     // BannerPlugin.ui,
      //     // {
      //     //   id: 'cms-banner',
      //     //   extensionPath: path.join(__dirname, 'plugins/banner/ui'),
      //     //   routes: [{ route: 'banner', filePath: 'routes.ts' }],
      //     //   providers: ['providers.ts'],
      //     // },

      //   ],

      //   devMode: false,
      // }),
    }),


  ],
  orderOptions: {
    process: [defaultOrderProcess, productDeliveredNotificationProcess, orderCanceledNotificationProcess],
  },
};
