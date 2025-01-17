import { Args, Query, Resolver } from '@nestjs/graphql';
import { Allow, RequestContext } from '@vendure/core';
import { CustomBannerService } from '../services/custom-banner.service';
import { CustomBanner } from '../entities/custom-banner.entity';

@Resolver()
export class CustomBannerShopResolver {
    constructor(private customBannerService: CustomBannerService) {}

    @Query()
    async customBanners(
        @Args('channelId') channelId: string,  // Accepts channelId from query
        ctx: RequestContext                    // Use RequestContext directly
    ): Promise<CustomBanner[]> {
        return this.customBannerService.findByChannel(ctx, channelId);
    }
}
