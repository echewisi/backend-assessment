import { Body, Controller, Delete, Get, Param, Post, Query, Put, NotFoundException } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { ProductWaitlistDTO } from './dto/product.waitlist.dto';

@Controller({ path: 'waitlist', version: '1' })
export class WaitlistController {
  constructor(private waitlistService: WaitlistService) {}

  // join waitlist
  @Post('/waitlist')
  joinWaitlist(@Body() { email, fullname }: ProductWaitlistDTO) {
    return this.waitlistService.joinWaitlist({ email, fullname });
  }


  @Put("update-email/:id")
  async updateWaitlistUserEmail(@Param('id') id: string,  @Body('email') newEmail: string): Promise<void>{
    await this.waitlistService.updateUserEmail(id, newEmail)
  }

  // exit waitlist // ex https://easepay.io/waitlist?email=example.com
  @Get("waitlist/:email")
  GetWaitlistUser(@Query('email') email: string) {
    try{
      return this.waitlistService.getUserEmailWaitlist(email);
    } catch(error){
      if(error instanceof NotFoundException){
        throw new NotFoundException("user not found!")
      }
      throw error
    }
  }

  @Delete("waitlist/:email")
  deleteWaitlist(@Body() { email }: { email: string }) {
    return this.waitlistService.exitWaitlist(email);
  }
}
