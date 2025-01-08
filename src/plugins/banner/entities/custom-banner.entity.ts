import { Asset, DeepPartial, HasCustomFields, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

export class CustomBannerCustomFields {}

@Entity()
export class CustomBanner extends VendureEntity implements HasCustomFields {
    constructor(input?: DeepPartial<CustomBanner>) {
        super(input);
    }

    @Column(type => CustomBannerCustomFields)
    customFields: CustomBannerCustomFields;

    @ManyToMany(() => Asset, { eager: true })
    @JoinTable()
    assets: Asset[];
}
