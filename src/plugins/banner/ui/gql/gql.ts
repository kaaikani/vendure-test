/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetBanners {\n    customBanners {\n      items {\n        id\n        assets {\n          id\n          source\n        }\n        channels {\n          id\n        }\n      }\n    }\n  }\n": types.GetBannersDocument,
    "\n          query GetActiveChannel {\n            activeChannel {\n              id\n            }\n          }\n        ": types.GetActiveChannelDocument,
    "\n      mutation CreateAsset($input: [CreateAssetInput!]!) {\n        createAssets(input: $input) {\n          ... on Asset {\n            id\n            source\n          }\n          ... on MimeTypeError {\n            message\n            fileName\n          }\n        }\n      }\n    ": types.CreateAssetDocument,
    "\n      mutation CreateCustomBanner($input: CreateCustomBannerInput!) {\n        createCustomBanner(input: $input) { id assets { source } }\n      }\n    ": types.CreateCustomBannerDocument,
    "\n      mutation UpdateCustomBanner($input: UpdateCustomBannerInput!) {\n        updateCustomBanner(input: $input) {\n          id\n          assets { source }\n        }\n      }\n    ": types.UpdateCustomBannerDocument,
    "\n      mutation DeleteCustomBanner($id: ID!) {\n        deleteCustomBanner(id: $id) { result }\n      }\n    ": types.DeleteCustomBannerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBanners {\n    customBanners {\n      items {\n        id\n        assets {\n          id\n          source\n        }\n        channels {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBanners {\n    customBanners {\n      items {\n        id\n        assets {\n          id\n          source\n        }\n        channels {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query GetActiveChannel {\n            activeChannel {\n              id\n            }\n          }\n        "): (typeof documents)["\n          query GetActiveChannel {\n            activeChannel {\n              id\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateAsset($input: [CreateAssetInput!]!) {\n        createAssets(input: $input) {\n          ... on Asset {\n            id\n            source\n          }\n          ... on MimeTypeError {\n            message\n            fileName\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateAsset($input: [CreateAssetInput!]!) {\n        createAssets(input: $input) {\n          ... on Asset {\n            id\n            source\n          }\n          ... on MimeTypeError {\n            message\n            fileName\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateCustomBanner($input: CreateCustomBannerInput!) {\n        createCustomBanner(input: $input) { id assets { source } }\n      }\n    "): (typeof documents)["\n      mutation CreateCustomBanner($input: CreateCustomBannerInput!) {\n        createCustomBanner(input: $input) { id assets { source } }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCustomBanner($input: UpdateCustomBannerInput!) {\n        updateCustomBanner(input: $input) {\n          id\n          assets { source }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCustomBanner($input: UpdateCustomBannerInput!) {\n        updateCustomBanner(input: $input) {\n          id\n          assets { source }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteCustomBanner($id: ID!) {\n        deleteCustomBanner(id: $id) { result }\n      }\n    "): (typeof documents)["\n      mutation DeleteCustomBanner($id: ID!) {\n        deleteCustomBanner(id: $id) { result }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;