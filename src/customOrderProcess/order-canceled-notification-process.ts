import { SmsService } from "../smsService";
import { OrderProcess } from "@vendure/core";

export const orderCanceledNotificationProcess: OrderProcess<"OrderCanceledNotificationProcess"> = {
  onTransitionStart(fromState, toState, data) {
    console.log(`current state ${fromState} to ${toState}`);
    if (toState === "Cancelled") {
      data.order.payments.forEach(() => {
        const smsService = new SmsService(
          "647ad6d8d6fc0553390fdd64", // template ID for "order cancelled"
          data.order.customer!.phoneNumber,
          {
            orderId: data.order.id.toString(), // variable expected by template
          }
        );
        smsService.sendSms();
      });
    }
  },
};
