import { SmsService } from "../smsService";
export const orderCanceledNotificationProcess = {
    onTransitionStart(fromState, toState, data) {
        console.log(`current state ${fromState} to ${toState}`);
        // Order Cancelled
        if (toState === "Cancelled") {
            data.order.payments.forEach((element) => {
                const smsService = new SmsService("647ad6d8d6fc0553390fdd64", data.order.customer.phoneNumber, "order_cancelled", data.order.id.toString());
                smsService.sendSms();
            });
        }
    },
};
