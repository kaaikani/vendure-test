"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAdminUi = void 0;
const compiler_1 = require("@vendure/ui-devkit/compiler");
const path_1 = __importDefault(require("path"));
const banner_plugin_1 = require("./plugins/banner/banner.plugin");
const manualadmincustomerchannel_plugin_1 = require("./plugins/manualadmincustomerchannel/manualadmincustomerchannel.plugin");
if (require.main === module) {
    // Called directly from command line
    (_b = (_a = customAdminUi({ recompile: true, devMode: false })).compile) === null || _b === void 0 ? void 0 : _b.call(_a).then(() => {
        process.exit(0);
    });
}
function customAdminUi(options) {
    const compiledAppPath = path_1.default.join(__dirname, "../admin-ui");
    if (options.recompile) {
        return (0, compiler_1.compileUiExtensions)({
            outputPath: compiledAppPath,
            extensions: [
                banner_plugin_1.BannerPlugin.UiExtensions,
                manualadmincustomerchannel_plugin_1.ManualCustomerChannelPlugin.UiExtensions,
            ],
            devMode: options.devMode,
        });
    }
    else {
        return {
            path: path_1.default.join(compiledAppPath, "dist"),
        };
    }
}
exports.customAdminUi = customAdminUi;
