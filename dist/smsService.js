"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const request_1 = __importDefault(require("request"));
class SmsService {
    constructor(templateId, mobiles, variables) {
        this.templateId = templateId;
        this.mobiles = mobiles;
        this.variables = variables;
        this.smsData = {
            template_id: templateId,
            sender: 'KAIMSG',
            mobiles: '+91' + mobiles,
            ...variables, // this will flatten OTP: '1234' into JSON
        };
    }
    sendSms() {
        const path = `https://control.msg91.com/api/v5/flow/`;
        const options = {
            method: 'POST',
            url: path,
            body: JSON.stringify(this.smsData),
            headers: {
                accept: 'application/json',
                authkey: '395929A2YW1qXt4afm682c115cP1',
                'content-type': 'application/json',
            },
        };
        (0, request_1.default)(options, (error, response) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log('SMS API Response:', response.body);
            }
        });
    }
}
exports.SmsService = SmsService;
