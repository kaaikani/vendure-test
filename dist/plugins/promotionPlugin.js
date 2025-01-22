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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionPlugin = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const schemaExtension = (0, graphql_tag_1.default) `
type CoupcodesList implements PaginatedList {
  items: [Promotion!]!
  totalItems: Int!
}
extend type Query {
  getCouponCodeList: CoupcodesList!
}

extend type Mutation {
  togglePromotionState(promotionId: ID!,value: Boolean!): Promotion!
}
`;
let CouponCodeResolver = class CouponCodeResolver {
    constructor(promotionService) {
        this.promotionService = promotionService;
    }
    async getCouponCodeList(ctx) {
        let res = await this.promotionService.findAll(ctx, {
            take: 10,
        });
        // console.log("res", res);
        return res;
    }
    async togglePromotionState(ctx, args) {
        const promotion = this.promotionService.updatePromotion(ctx, {
            id: args.promotionId,
            customFields: {
                shouldApply: args.value
            }
        });
        return promotion;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, core_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext]),
    __metadata("design:returntype", Promise)
], CouponCodeResolver.prototype, "getCouponCodeList", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CouponCodeResolver.prototype, "togglePromotionState", null);
CouponCodeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.PromotionService])
], CouponCodeResolver);
let PromotionPlugin = class PromotionPlugin {
};
exports.PromotionPlugin = PromotionPlugin;
exports.PromotionPlugin = PromotionPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        compatibility: '^3.0.4',
        configuration: config => {
            config.customFields.Promotion.push({
                name: 'shouldApply',
                type: 'boolean',
                defaultValue: false,
            });
            return config;
        },
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CouponCodeResolver],
        },
        providers: [core_1.PromotionService],
    })
], PromotionPlugin);
