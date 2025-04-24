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
            const smsService = new smsService_1.SmsService("646b0f38d6fc052379785ec2", // template ID for "delivered"
            data.order.customer.phoneNumber, {
                orderId: data.order.id.toString(), // variable expected by template
            });
            smsService.sendSms();
        }
    },
};
