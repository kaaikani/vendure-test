"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const request_1 = __importDefault(require("request"));
class SmsService {
    constructor(templateId, mobiles, orderType, orderId) {
        this.smsData = {
            template_id: "64900d7fd6fc053c5e31a685",
            sender: "KAIMSG",
            mobiles: "91XXXXXXXXXX",
        };
        this.smsData.template_id = templateId;
        this.smsData.mobiles = '+91' + mobiles;
        this.orderType = orderType;
        this.orderId = orderId;
    }
    sendSms() {
        const path = `https://control.msg91.com/api/v5/flow/`;
        console.log(path);
        if (this.orderType == "order_cancelled") {
            this.smsData.number = this.orderId;
        }
        let options = {
            method: "POST",
            url: path,
            body: JSON.stringify(this.smsData),
            headers: {
                accept: "application/json",
                authkey: "395929AcYuel89696451b515P1",
                "content-type": "application/json",
            },
        };
        console.log('template id ' + this.smsData.template_id + 'sender ' + this.smsData.sender + 'mobile ' + this.smsData.mobiles + 'number ' + this.smsData.number + 'var' + this.smsData.var);
        (0, request_1.default)(options, (error, response) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(response.body);
            }
        });
    }
}
exports.SmsService = SmsService;
