import {
  VendurePlugin,
  PluginCommonModule,
  OrderStateTransitionEvent,
  EventBus,
  TransactionalConnection,
  Order,
  RequestContext,
  ID,
} from '@vendure/core';
import { OnApplicationBootstrap } from '@nestjs/common';

@VendurePlugin({
  imports: [PluginCommonModule],
})
export class SetISTOrderPlacedAtPlugin implements OnApplicationBootstrap {
  constructor(
    private eventBus: EventBus,
    private connection: TransactionalConnection
  ) {}

  onApplicationBootstrap() {
    this.eventBus.ofType(OrderStateTransitionEvent).subscribe(async (event) => {
      const targetStates = ['PaymentSettled', 'PaymentAuthorized'];

      if (targetStates.includes(event.toState)) {
        const ctx: RequestContext = event.ctx;
        const orderId: ID = event.order.id;
        const utcPlacedAt = event.order.orderPlacedAt;

        if (!utcPlacedAt) return;

        // Add +5:30 to UTC time to get IST
        const istTime = new Date(utcPlacedAt.getTime() + (5.5 * 60 * 60 * 1000));

        await this.connection.getRepository(ctx, Order).update(orderId, {
          orderPlacedAt: istTime,
        });

        console.log(`✅ orderPlacedAt updated to IST (${istTime.toISOString()}) for order ${event.order.code}`);
      }
    });
  }
}