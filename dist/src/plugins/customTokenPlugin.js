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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTokenPlugin = void 0;
const storageService_1 = require("../storageService");
const graphql_1 = require("@nestjs/graphql");
const graphql_tag_1 = require("graphql-tag");
const core_1 = require("@vendure/core");
const schemaExtension = (0, graphql_tag_1.gql) `
  extend type Query {
    getPasswordResetToken: String!
  }
`;
let CustomTokenResolver = class CustomTokenResolver {
    constructor() { }
    getPasswordResetToken(ctx) {
        var _a;
        return (_a = storageService_1.StorageService.passwordResetToken) !== null && _a !== void 0 ? _a : 'no token';
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, core_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext]),
    __metadata("design:returntype", void 0)
], CustomTokenResolver.prototype, "getPasswordResetToken", null);
CustomTokenResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [])
], CustomTokenResolver);
let CustomTokenPlugin = class CustomTokenPlugin {
};
exports.CustomTokenPlugin = CustomTokenPlugin;
exports.CustomTokenPlugin = CustomTokenPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        compatibility: '^3.0.4',
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CustomTokenResolver]
        }
    })
], CustomTokenPlugin);
