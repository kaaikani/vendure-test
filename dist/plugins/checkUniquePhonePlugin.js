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
exports.CheckUniquePhonePlugin = void 0;
const core_1 = require("@vendure/core");
const graphql_1 = require("@nestjs/graphql");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const schemaExtension = (0, graphql_tag_1.default) `
extend type Query {
checkUniquePhone(phone: String!):Boolean!
}
`;
let CheckUniquePhoneResolver = class CheckUniquePhoneResolver {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async checkUniquePhone(ctx, args) {
        let customers = await this.customerService.findAll(ctx, {
            take: 2,
            filter: { phoneNumber: { eq: `${args.phone}` } },
        });
        // make sure only one customer was selected
        if (!customers["totalItems"] || customers["totalItems"] > 1) {
            return true;
        }
        if (!customers["items"][0] || !customers["items"][0].user) {
            return true;
        }
        return false;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CheckUniquePhoneResolver.prototype, "checkUniquePhone", null);
CheckUniquePhoneResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.CustomerService])
], CheckUniquePhoneResolver);
let CheckUniquePhonePlugin = class CheckUniquePhonePlugin {
};
exports.CheckUniquePhonePlugin = CheckUniquePhonePlugin;
exports.CheckUniquePhonePlugin = CheckUniquePhonePlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        compatibility: '^3.0.4',
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CheckUniquePhoneResolver],
        },
    })
], CheckUniquePhonePlugin);
