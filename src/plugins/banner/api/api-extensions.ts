import gql from 'graphql-tag';


const customBannerAdminApiExtensions = gql`
  type CustomBanner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    assets: [Asset!]!
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
  }

  input CustomBannerFilter {
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

export const adminApiExtensions = gql`
  ${customBannerAdminApiExtensions}
`;
