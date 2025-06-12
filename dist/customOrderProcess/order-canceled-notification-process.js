"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderCanceledNotificationProcess = void 0;
const smsService_1 = require("../smsService");
exports.orderCanceledNotificationProcess = {
    onTransitionStart(fromState, toState, data) {
        console.log(`current state ${fromState} to ${toState}`);
        console.log(`Order code: ${data.order.code}`); // ✅ Log the order code
        if (toState === "Cancelled") {
            data.order.payments.forEach(() => {
                const smsService = new smsService_1.SmsService("647ad6d8d6fc0553390fdd64", // template ID for "order cancelled"
                data.order.customer.phoneNumber, {
                    var1: data.order.code.toString(), // or use data.order.code if needed
                });
                smsService.sendSms();
            });
        }
    },
};
