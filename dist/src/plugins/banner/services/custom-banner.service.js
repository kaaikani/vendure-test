var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { DeletionResult } from '@vendure/common/lib/generated-types';
import { AssetService, CustomFieldRelationService, ForbiddenError, InternalServerError, ListQueryBuilder, TransactionalConnection, UserInputError, assertFound } from '@vendure/core';
import { BANNER_PLUGIN_OPTIONS } from '../constants';
import { CustomBanner } from '../entities/custom-banner.entity';
let CustomBannerService = class CustomBannerService {
    connection;
    assetService;
    listQueryBuilder;
    customFieldRelationService;
    options;
    constructor(connection, assetService, listQueryBuilder, customFieldRelationService, options) {
        this.connection = connection;
        this.assetService = assetService;
        this.listQueryBuilder = listQueryBuilder;
        this.customFieldRelationService = customFieldRelationService;
        this.options = options;
    }
    findByChannel(ctx, channelId) {
        return this.connection.rawConnection.getRepository(CustomBanner).find({
            relations: ['channels'],
            where: {
                channels: { id: channelId } // Filters banners by channelId dynamically
            }
        });
    }
    findAll(ctx, options, relations) {
        const whereCondition = options?.channelId
            ? { channels: { id: options.channelId } } // Query banners for a specific channel
            : { channels: { id: ctx.channelId } }; // Default to current channel
        return this.listQueryBuilder
            .build(CustomBanner, options, {
            relations: [...(relations || []), 'channels'],
            ctx,
            where: whereCondition,
        })
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }
    findOne(ctx, id, relations) {
        return this.connection.getRepository(ctx, CustomBanner).findOne({
            where: { id },
            relations: [...(relations || []), 'channels'],
        });
    }
    async create(ctx, input) {
        const newBanner = new CustomBanner();
        if (input.assetIds && input.assetIds.length > 0) {
            const assetList = await this.assetService.findAll(ctx, {
                filter: { id: { in: input.assetIds.map(String) } }
            });
            newBanner.assets = assetList.items;
        }
        newBanner.channels = [ctx.channel];
        const savedBanner = await this.connection.getRepository(ctx, CustomBanner).save(newBanner);
        return assertFound(this.findOne(ctx, savedBanner.id));
    }
    async update(ctx, input) {
        const banner = await this.connection.getEntityOrThrow(ctx, CustomBanner, input.id, { relations: ['channels'] });
        if (!banner) {
            throw new UserInputError(`CustomBanner with id ${input.id} not found`);
        }
        if (!banner.channels) {
            throw new InternalServerError(`Channels are not loaded for the CustomBanner with id ${input.id}`);
        }
        if (!banner.channels.some(channel => channel.id === ctx.channelId)) {
            throw new ForbiddenError();
        }
        if (input.assetIds && input.assetIds.length > 0) {
            const assetList = await this.assetService.findAll(ctx, {
                filter: { id: { in: input.assetIds.map(String) } }
            });
            banner.assets = assetList.items;
        }
        await this.connection.getRepository(ctx, CustomBanner).save(banner);
        return assertFound(this.findOne(ctx, banner.id));
    }
    async delete(ctx, id) {
        const banner = await this.connection.getRepository(ctx, CustomBanner).findOne({
            where: { id },
            relations: ['channels'],
        });
        if (!banner) {
            throw new UserInputError(`CustomBanner with id ${id} not found`);
        }
        if (!banner.channels) {
            throw new InternalServerError(`Channels are not loaded for the CustomBanner with id ${id}`);
        }
        if (!banner.channels.some(channel => channel.id === ctx.channelId)) {
            throw new ForbiddenError();
        }
        try {
            await this.connection.getRepository(ctx, CustomBanner).remove(banner);
            return { result: DeletionResult.DELETED };
        }
        catch (e) {
            return { result: DeletionResult.NOT_DELETED, message: e.toString() };
        }
    }
};
CustomBannerService = __decorate([
    Injectable(),
    __param(4, Inject(BANNER_PLUGIN_OPTIONS)),
    __metadata("design:paramtypes", [TransactionalConnection,
        AssetService,
        ListQueryBuilder,
        CustomFieldRelationService, Object])
], CustomBannerService);
export { CustomBannerService };
