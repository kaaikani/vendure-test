import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin, configureS3AssetStorage, S3AssetStorageStrategy } from '@vendure/asset-server-plugin';
import {
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  defaultPromotionConditions,
  defaultOrderProcess,
  dummyPaymentHandler,
  DefaultAssetNamingStrategy,
  DefaultLogger,
  LogLevel,
} from '@vendure/core';
import { BullMQJobQueuePlugin } from '@vendure/job-queue-plugin/package/bullmq';
import { EmailPlugin, defaultEmailHandlers } from '@vendure/email-plugin';
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
import { Request } from 'express';
import * as path from 'path';
// import { ManualCustomerChannelPlugin } from './plugins/manualadmincustomerchannel/manualadmincustomerchannel.plugin';
import { BannerPlugin } from './plugins/banner/banner.plugin';
import { ManualCustomerChannelPlugin } from './plugins/manualadmincustomerchannel/manualadmincustomerchannel.plugin';

import { StockMonitoringPlugin } from '@pinelab/vendure-plugin-stock-monitoring';
const IS_DEV = process.env.APP_ENV === 'dev';



export const config: VendureConfig = {
  // logger: new DefaultLogger({ level: LogLevel.Verbose }),
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
    //Default AssetServerPlugin

    // AssetServerPlugin.init({
    //   route: 'assets',
    //   assetUploadDir: path.join(__dirname, '../static/assets'),
    //   assetUrlPrefix: IS_DEV ? undefined : '/assets',
    // }),

      
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      namingStrategy: new DefaultAssetNamingStrategy(),
      storageStrategyFactory: configureS3AssetStorage({
        bucket: 'cdn.kaaikanistore.com',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
        nativeS3Configuration: {
          region: 'ap-south-1',
        },
      }),
      assetUrlPrefix: 'cdn.kaaikanistore.com/', 

    }),
    
    

   
      









    // DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    BullMQJobQueuePlugin.init({
      connection: {
        host: '127.0.0.1',  // Ensure Redis is running on this address
        port: 6379,
        maxRetriesPerRequest: null,  // ✅ Required to avoid the error
      },
      workerOptions: {
        concurrency: 10,
        // removeOnComplete: { count: 500 },
        // removeOnFail: { age: 60 * 60 * 24 * 7, count: 1000 },
      },
      queueOptions: {
        prefix: 'vendure',
        defaultJobOptions: {
          attempts: 3, // Retry failed jobs 3 times
          backoff: { type: 'exponential', delay: 1000 },
        },
      },
    }),



    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      route: "mailbox",
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../static/email/templates"),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: "http://localhost:8080/verify",
        passwordResetUrl: "http://localhost:8080/password-reset",
        changeEmailAddressUrl:
          "http://localhost:8080/verify-email-address-change",
      },
    }),
    AdminUiPlugin.init({
      port: 3002,
      app: {
        path: path.join(__dirname, '../admin-ui/dist'),
      },
      route: 'admin'
    }),

    ChannelPlugin,
    CheckUniquePhonePlugin,
    PromotionPlugin,
    CancelOrderPlugin,
    CustomEventPlugin,
    CustomTokenPlugin,
    CollectionIsPrivatePlugin,
    ManualCustomerChannelPlugin,
    BannerPlugin,
    // StockMonitoringPlugin.init({
    //   threshold: 10,
    // }),


  ],
  orderOptions: {
    process: [defaultOrderProcess, productDeliveredNotificationProcess, orderCanceledNotificationProcess],
  },
};

