"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const compiler_1 = require("@vendure/ui-devkit/compiler");
const admin_ui_plugin_1 = require("@vendure/admin-ui-plugin");
const asset_server_plugin_1 = require("@vendure/asset-server-plugin");
const core_1 = require("@vendure/core");
const email_plugin_1 = require("@vendure/email-plugin");
require("dotenv/config");
const order_canceled_notification_process_1 = require("./customOrderProcess/order-canceled-notification-process");
const product_delivered_notification_process_1 = require("./customOrderProcess/product-delivered-notification-process");
const cancelOrderPlugin_1 = require("./plugins/cancelOrderPlugin");
const checkUniquePhonePlugin_1 = require("./plugins/checkUniquePhonePlugin");
const customEventPlugin_1 = require("./plugins/customEventPlugin");
const customTokenPlugin_1 = require("./plugins/customTokenPlugin");
const collectionIsPrivate_1 = require("./plugins/collectionIsPrivate");
const promotionPlugin_1 = require("./plugins/promotionPlugin");
const shouldApply_1 = require("./customPromotionConditions/shouldApply");
const channelPlugin_1 = require("./plugins/channelPlugin");
const path = __importStar(require("path"));
const manualadmincustomerchannel_plugin_1 = require("./plugins/manualadmincustomerchannel/manualadmincustomerchannel.plugin");
const banner_plugin_1 = require("./plugins/banner/banner.plugin"); // Import BannerPlugin
const IS_DEV = process.env.APP_ENV === 'dev';
exports.config = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        ...(IS_DEV
            ? {
                adminApiPlayground: {
                    settings: { 'request.credentials': 'include' },
                },
                adminApiDebug: true,
                shopApiPlayground: {
                    settings: { 'request.credentials': 'include' },
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
        paymentMethodHandlers: [core_1.dummyPaymentHandler],
    },
    customFields: {},
    promotionOptions: {
        promotionConditions: [...core_1.defaultPromotionConditions, shouldApply_1.shouldApplyCouponcode],
    },
    plugins: [
        asset_server_plugin_1.AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets',
        }),
        core_1.DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        core_1.DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        email_plugin_1.EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: email_plugin_1.defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
            },
        }),
        channelPlugin_1.ChannelPlugin,
        checkUniquePhonePlugin_1.CheckUniquePhonePlugin,
        promotionPlugin_1.PromotionPlugin,
        cancelOrderPlugin_1.CancelOrderPlugin,
        customEventPlugin_1.CustomEventPlugin,
        customTokenPlugin_1.CustomTokenPlugin,
        collectionIsPrivate_1.CollectionIsPrivatePlugin,
        manualadmincustomerchannel_plugin_1.ManualCustomerChannelPlugin,
        banner_plugin_1.BannerPlugin, // Add the BannerPlugin to the plugins array
        admin_ui_plugin_1.AdminUiPlugin.init({
            port: 3000,
            route: 'admin',
            app: (0, compiler_1.compileUiExtensions)({
                outputPath: path.join(__dirname, '../admin-ui'),
                extensions: [
                    manualadmincustomerchannel_plugin_1.ManualCustomerChannelPlugin.ui,
                    {
                        id: 'assign-customer',
                        extensionPath: path.join(__dirname, 'plugins/manualadmincustomerchannel/ui'),
                        routes: [{ route: 'manual-1', filePath: 'routes.ts' }],
                        providers: ['providers.ts'],
                    },
                    {
                        id: 'banner-management', // You can use a custom ID for the Banner UI
                        extensionPath: path.join(__dirname, 'plugins/banner/ui'), // Point to the UI folder of BannerPlugin
                        routes: [{ route: 'banner', filePath: 'routes.ts' }], // Define your route and file path for banner UI
                        providers: ['providers.ts'], // Add providers for banner UI
                    },
                ],
                devMode: false,
            }),
        }),
    ],
    orderOptions: {
        process: [core_1.defaultOrderProcess, product_delivered_notification_process_1.productDeliveredNotificationProcess, order_canceled_notification_process_1.orderCanceledNotificationProcess],
    },
};
