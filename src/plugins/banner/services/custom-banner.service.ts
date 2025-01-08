import { Inject, Injectable } from '@nestjs/common';
import { DeletionResponse, DeletionResult } from '@vendure/common/lib/generated-types';
import { CustomFieldsObject, ID, PaginatedList } from '@vendure/common/lib/shared-types';
import {
    Asset,
    AssetService,
    CustomFieldRelationService,
    ListQueryBuilder,
    ListQueryOptions,
    RelationPaths,
    RequestContext,
    TransactionalConnection,
    assertFound,
    patchEntity
} from '@vendure/core';
import { BANNER_PLUGIN_OPTIONS } from '../constants';
import { CustomBanner } from '../entities/custom-banner.entity';
import { PluginInitOptions } from '../types';

interface CreateCustomBannerInput {
    assetIds?: ID[];
    customFields?: CustomFieldsObject;
}

interface UpdateCustomBannerInput {
    id: ID;
    assetIds?: ID[];
    customFields?: CustomFieldsObject;
}

@Injectable()
export class CustomBannerService {
    constructor(
        private connection: TransactionalConnection,
        private assetService: AssetService,
        private listQueryBuilder: ListQueryBuilder,
        private customFieldRelationService: CustomFieldRelationService,
        @Inject(BANNER_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) {}

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<CustomBanner>,
        relations?: RelationPaths<CustomBanner>,
    ): Promise<PaginatedList<CustomBanner>> {
        return this.listQueryBuilder
            .build(CustomBanner, options, { relations, ctx })
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }

    findOne(
        ctx: RequestContext,
        id: ID,
        relations?: RelationPaths<CustomBanner>,
    ): Promise<CustomBanner | null> {
        return this.connection.getRepository(ctx, CustomBanner).findOne({
            where: { id },
            relations,
        });
    }

    async create(ctx: RequestContext, input: CreateCustomBannerInput): Promise<CustomBanner> {
        const newBanner = new CustomBanner();

        if (input.assetIds && input.assetIds.length > 0) {
            const assetList = await this.assetService.findAll(ctx, {
                filter: { id: { in: input.assetIds.map(String) } }
            });
            newBanner.assets = assetList.items;
        }

        const savedBanner = await this.connection.getRepository(ctx, CustomBanner).save(newBanner);
        await this.customFieldRelationService.updateRelations(ctx, CustomBanner, input, savedBanner);

        return assertFound(this.findOne(ctx, savedBanner.id));
    }

    async update(ctx: RequestContext, input: UpdateCustomBannerInput): Promise<CustomBanner> {
        const banner = await this.connection.getEntityOrThrow(ctx, CustomBanner, input.id);

        if (input.assetIds && input.assetIds.length > 0) {
            const assetList = await this.assetService.findAll(ctx, {
                filter: { id: { in: input.assetIds.map(String) } }
            });
            banner.assets = assetList.items;
        }

        await this.connection.getRepository(ctx, CustomBanner).save(banner);
        await this.customFieldRelationService.updateRelations(ctx, CustomBanner, input, banner);

        return assertFound(this.findOne(ctx, banner.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, CustomBanner, id);
        try {
            await this.connection.getRepository(ctx, CustomBanner).remove(entity);
            return { result: DeletionResult.DELETED };
        } catch (e: any) {
            return { result: DeletionResult.NOT_DELETED, message: e.toString() };
        }
    }
}
