// phone-otp.resolver.ts
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Allow, Ctx, RequestContext } from '@vendure/core';
import { PhoneOtpService } from '../services/phone-otp.service';

@Resolver()
export class PhoneOtpResolver {
  constructor(private phoneOtpService: PhoneOtpService) {}

  @Mutation(() => Boolean)
  async sendPhoneOtp(
    @Ctx() ctx: RequestContext,
    @Args('phoneNumber') phoneNumber: string
  ): Promise<boolean> {
    return this.phoneOtpService.sendOtp(ctx, phoneNumber);
  }
}
