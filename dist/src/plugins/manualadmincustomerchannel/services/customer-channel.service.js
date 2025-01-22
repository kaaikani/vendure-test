var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ChannelService, Customer } from '@vendure/core';
let CustomerChannelService = class CustomerChannelService {
    channelService;
    customerRepository;
    defaultChannelId = '1';
    constructor(channelService) {
        this.channelService = channelService;
        this.customerRepository = channelService['connection'].getRepository(Customer);
    }
    async getCustomerAssignedChannels(ctx, customerId) {
        const customer = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: ['channels'],
        });
        if (!customer) {
            throw new Error(`Customer with ID ${customerId} not found.`);
        }
        return customer.channels.map((channel) => String(channel.id));
    }
    async assignCustomerToChannels(ctx, customerId, channelIds) {
        if (!customerId || !channelIds || channelIds.length === 0) {
            throw new Error("Customer ID and channel IDs are required and should not be empty.");
        }
        const currentChannelIds = await this.getCustomerAssignedChannels(ctx, customerId);
        const channelsToRemove = currentChannelIds.filter((id) => id !== this.defaultChannelId && !channelIds.includes(id));
        if (channelsToRemove.length > 0) {
            await this.channelService.removeFromChannels(ctx, Customer, customerId, channelsToRemove);
        }
        await this.channelService.assignToChannels(ctx, Customer, customerId, channelIds);
        return `Customer with ID ${customerId} assigned to channels with IDs ${channelIds.join(', ')}`;
    }
};
CustomerChannelService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ChannelService])
], CustomerChannelService);
export { CustomerChannelService };
