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
import { StorageService } from '../storageService';
import { Resolver, Query } from '@nestjs/graphql';
import { gql } from 'graphql-tag';
import { PluginCommonModule, RequestContext, Ctx, VendurePlugin } from '@vendure/core';
const schemaExtension = gql `
  extend type Query {
    getPasswordResetToken: String!
  }
`;
let CustomTokenResolver = class CustomTokenResolver {
    constructor() { }
    getPasswordResetToken(ctx) {
        return StorageService.passwordResetToken ?? 'no token';
    }
};
__decorate([
    Query(),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext]),
    __metadata("design:returntype", void 0)
], CustomTokenResolver.prototype, "getPasswordResetToken", null);
CustomTokenResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [])
], CustomTokenResolver);
let CustomTokenPlugin = class CustomTokenPlugin {
};
CustomTokenPlugin = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        compatibility: '^3.0.4',
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CustomTokenResolver]
        }
    })
], CustomTokenPlugin);
export { CustomTokenPlugin };
