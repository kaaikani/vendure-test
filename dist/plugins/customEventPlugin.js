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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEventPlugin = void 0;
const storageService_1 = require("./../storageService");
const core_1 = require("@vendure/core");
let CustomEventPlugin = class CustomEventPlugin {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    async onApplicationBootstrap() {
        this.eventBus
            .ofType(core_1.PasswordResetEvent)
            .subscribe((event) => {
            storageService_1.StorageService.userInfo = event.user;
            storageService_1.StorageService.passwordResetToken = event.user.getNativeAuthenticationMethod().passwordResetToken;
            console.log('passwordResetToken', storageService_1.StorageService.passwordResetToken);
        });
    }
};
exports.CustomEventPlugin = CustomEventPlugin;
exports.CustomEventPlugin = CustomEventPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        compatibility: '^3.0.4',
    }),
    __metadata("design:paramtypes", [core_1.EventBus])
], CustomEventPlugin);
