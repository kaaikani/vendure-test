"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiExtensions = exports.shopApiExtensions = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.shopApiExtensions = (0, graphql_tag_1.default) `
    type CustomBanner {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        assets: [Asset!]!
        channels: [Channel!]!
    }

    extend type Query {
        customBanners(channelId: ID!): [CustomBanner!]!  # <-- Accepts channelId as argument
    }
`;
const customBannerAdminApiExtensions = (0, graphql_tag_1.default) `
 type CustomBanner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    assets: [Asset!]!
    channels: [Channel!]!
}


  type CustomBannerList implements PaginatedList {
    items: [CustomBanner!]!
    totalItems: Int!
  }

  # Define the CustomBannerListOptions for filtering and pagination
  input CustomBannerListOptions {
    skip: Int
    take: Int
    filter: CustomBannerFilter
    sort: CustomBannerSort
    channelId: ID!
  }
input CustomBannerFilterParameter {
  channels: [ID!]
}


  input CustomBannerFilter {
     channels: [ID!]
    assets: [ID!]
  }

  input CustomBannerSort {
    createdAt: SortOrder
    updatedAt: SortOrder
  }

  extend type Query {
    customBanner(id: ID!): CustomBanner
    customBanners(options: CustomBannerListOptions): CustomBannerList!
  }

  input CreateCustomBannerInput {
    assetIds: [ID!]
  }

  input UpdateCustomBannerInput {
    id: ID!
    assetIds: [ID!]
  }

  extend type Mutation {
    createCustomBanner(input: CreateCustomBannerInput!): CustomBanner!
    updateCustomBanner(input: UpdateCustomBannerInput!): CustomBanner!
    deleteCustomBanner(id: ID!): DeletionResponse!
  }
`;
exports.adminApiExtensions = (0, graphql_tag_1.default) `
  ${customBannerAdminApiExtensions}
`;
