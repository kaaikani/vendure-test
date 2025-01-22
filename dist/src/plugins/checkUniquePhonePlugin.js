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
import { Ctx, CustomerService, PluginCommonModule, RequestContext, VendurePlugin } from "@vendure/core";
import { Resolver, Args, Query } from '@nestjs/graphql';
import gql from 'graphql-tag';
const schemaExtension = gql `
extend type Query {
checkUniquePhone(phone: String!):Boolean!
}
`;
let CheckUniquePhoneResolver = class CheckUniquePhoneResolver {
    customerService;
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
    Query(),
    __param(0, Ctx()),
    __param(1, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CheckUniquePhoneResolver.prototype, "checkUniquePhone", null);
CheckUniquePhoneResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [CustomerService])
], CheckUniquePhoneResolver);
let CheckUniquePhonePlugin = class CheckUniquePhonePlugin {
};
CheckUniquePhonePlugin = __decorate([
    VendurePlugin({
        imports: [PluginCommonModule],
        compatibility: '^3.0.4',
        shopApiExtensions: {
            schema: schemaExtension,
            resolvers: [CheckUniquePhoneResolver],
        },
    })
], CheckUniquePhonePlugin);
export { CheckUniquePhonePlugin };
