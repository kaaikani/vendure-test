import { SmsService } from "../smsService";
export const productDeliveredNotificationProcess = {
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
            const smsService = new SmsService("646b0f38d6fc052379785ec2", data.order.customer.phoneNumber, "delivered", data.order.id.toString());
            smsService.sendSms();
        }
    },
};
