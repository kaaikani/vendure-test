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
import { Resolver, Query, Args } from '@nestjs/graphql';
import { gql } from 'graphql-tag';
import { PluginCommonModule, RequestContext, Ctx, CollectionService } from '@vendure/core';
import { VendurePlugin } from '@vendure/core';
const schemaExtension = gql `
extend type Query {
    checkCollectionIsPrivate(collectionId:ID!):Boolean!
}
`;
let CollectionIsPrivateResolver = class CollectionIsPrivateResolver {
    collectionService;
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    checkCollectionIsPrivate(ctx, args) {
        let isPrivate = false;
        return this.collectionService.findOne(ctx, args.collectionId).then(data => {
            console.log('check isPrivate', data?.isPrivate);
            isPrivate = data?.isPrivate;
            return isPrivate;
        });
    }
};
__decorate([
    Query(),
    __param(0, Ctx()),
    __param(1, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object]),
    __metadata("design:returntype", void 0)
], CollectionIsPrivateResolver.prototype, "checkCollectionIsPrivate", null);
CollectionIsPrivateResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [CollectionService])
], CollectionIsPrivateResolver);
let CollectionIsPrivatePlugin = class CollectionIsPrivatePlugin {
};
CollectionIsPrivatePlugin = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        compatibility: '^3.0.4',
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CollectionIsPrivateResolver]
        }
    })
], CollectionIsPrivatePlugin);
export { CollectionIsPrivatePlugin };
