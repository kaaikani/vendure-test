"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldApplyCouponcode = void 0;
const core_1 = require("@vendure/core");
exports.shouldApplyCouponcode = new core_1.PromotionCondition({
    code: "shouldApplyCouponcode",
    args: {},
    description: [
        { languageCode: core_1.LanguageCode.en, value: 'Coupon code should be applicable' }
    ],
    check: (ctx, order, args, promotion) => {
        return promotion.customFields.shouldApply;
    },
});
