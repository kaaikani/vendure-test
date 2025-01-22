"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDeliveredNotificationProcess = void 0;
const smsService_1 = require("../smsService");
exports.productDeliveredNotificationProcess = {
    transitions: {
        Shipped: {
            to: ["ProductDeliveredNotificationProcess"],
            mergeStrategy: "replace",
        },
        ProductDeliveredNotificationProcess: {
            to: ["Delivered", "Shipped"],
        },
    },
    onTransitionStart(fromState, toState, data) {
        if (fromState === "ProductDeliveredNotificationProcess" &&
            toState === "Delivered") {
            // order Delivered
            const smsService = new smsService_1.SmsService("646b0f38d6fc052379785ec2", data.order.customer.phoneNumber, "delivered", data.order.id.toString());
            smsService.sendSms();
        }
    },
};
