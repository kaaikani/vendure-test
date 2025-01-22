var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { StorageService } from './../storageService';
import { EventBus, PasswordResetEvent, PluginCommonModule, VendurePlugin } from '@vendure/core';
let CustomEventPlugin = class CustomEventPlugin {
    eventBus;
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    async onApplicationBootstrap() {
        this.eventBus
            .ofType(PasswordResetEvent)
            .subscribe((event) => {
            StorageService.userInfo = event.user;
            StorageService.passwordResetToken = event.user.getNativeAuthenticationMethod().passwordResetToken;
            console.log('passwordResetToken', StorageService.passwordResetToken);
        });
    }
};
CustomEventPlugin = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        compatibility: '^3.0.4',
    }),
    __metadata("design:paramtypes", [EventBus])
], CustomEventPlugin);
export { CustomEventPlugin };
