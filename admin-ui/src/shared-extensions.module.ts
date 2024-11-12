import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedProviders_0_0 from './extensions/manual-customer-channel-ui/providers';
import SharedProviders_1_0 from './extensions/assign-customer/providers';


@NgModule({
    imports: [CommonModule, ],
    providers: [...SharedProviders_0_0, ...SharedProviders_1_0],
})
export class SharedExtensionsModule {}
