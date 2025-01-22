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
exports.CancelOrderPlugin = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_tag_1 = require("graphql-tag");
const core_1 = require("@vendure/core");
const core_2 = require("@vendure/core");
const schemaExtension = (0, graphql_tag_1.gql) `
  extend type Mutation {
    cancelOrderOnClientRequest(orderId: ID!,value: Int!): Order!
    otherInstructions(orderId: ID!,value: String!): Order!
  }
`;
let CancelOrderRequestResolver = class CancelOrderRequestResolver {
    constructor(orderService) {
        this.orderService = orderService;
    }
    cancelOrderOnClientRequest(ctx, args) {
        return this.orderService.updateCustomFields(ctx, args.orderId, { clientRequestToCancel: args.value });
    }
    otherInstructions(ctx, args) {
        return this.orderService.updateCustomFields(ctx, args.orderId, { otherInstructions: args.value });
    }
};
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], CancelOrderRequestResolver.prototype, "cancelOrderOnClientRequest", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], CancelOrderRequestResolver.prototype, "otherInstructions", null);
CancelOrderRequestResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.OrderService])
], CancelOrderRequestResolver);
let CancelOrderPlugin = class CancelOrderPlugin {
};
exports.CancelOrderPlugin = CancelOrderPlugin;
exports.CancelOrderPlugin = CancelOrderPlugin = __decorate([
    (0, core_2.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        compatibility: '^3.0.4',
        configuration: config => {
            config.customFields.Order.push({
                type: 'int',
                defaultValue: 0,
                name: 'clientRequestToCancel'
            });
            config.customFields.Order.push({
                type: 'string',
                defaultValue: '',
                name: 'otherInstructions'
            });
            return config;
        },
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CancelOrderRequestResolver]
        },
        adminApiExtensions: {
            schema: schemaExtension,
            resolvers: [CancelOrderRequestResolver]
        }
    })
], CancelOrderPlugin);
