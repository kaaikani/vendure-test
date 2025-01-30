"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderCanceledNotificationProcess = void 0;
const smsService_1 = require("../smsService");
exports.orderCanceledNotificationProcess = {
    onTransitionStart(fromState, toState, data) {
        console.log(`current state ${fromState} to ${toState}`);
        // Order Cancelled
        if (toState === "Cancelled") {
            data.order.payments.forEach((element) => {
                const smsService = new smsService_1.SmsService("647ad6d8d6fc0553390fdd64", data.order.customer.phoneNumber, "order_cancelled", data.order.id.toString());
                smsService.sendSms();
            });
        }
    },
};
