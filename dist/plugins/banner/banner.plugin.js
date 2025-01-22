"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerPlugin = exports.bannerSchemaExtension = void 0;
const core_1 = require("@vendure/core");
const graphql_1 = require("@nestjs/graphql");
const banner_resolvers_1 = require("./resolvers/banner.resolvers");
const service_1 = require("./services/service");
const banner_module_1 = require("./banner.module");
const graphql_tag_1 = require("graphql-tag");
exports.bannerSchemaExtension = (0, graphql_tag_1.gql) `
  type Banner {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    enabled: Boolean!
    imageUrl: String!
    channelId: ID!
    featuredAsset: Asset
    assets: [Asset!]!
  }

  input CreateBannerInput {
    channelId: ID!
    enabled: Boolean
    assetIds: [ID!]!
  }

  input UpdateBannerInput {
    id: ID!
    enabled: Boolean
    assetIds: [ID!]!
  }

  type BannerList {
    items: [Banner!]!
    totalItems: Int!
  }

  extend type Query {
    getBanners(channelId: ID!): BannerList!
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput!): Banner!
    updateBanner(input: UpdateBannerInput!): Banner!
    deleteBanner(id: ID!): Boolean!
  }
`;
let BannerPlugin = class BannerPlugin {
};
exports.BannerPlugin = BannerPlugin;
exports.BannerPlugin = BannerPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule, graphql_1.GraphQLModule.forRoot({}), banner_module_1.BannerModule],
        providers: [banner_resolvers_1.BannerResolver, service_1.BannerService],
        adminApiExtensions: {
            schema: exports.bannerSchemaExtension, // Directly assign the schema
        },
    })
], BannerPlugin);
