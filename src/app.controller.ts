import { Controller, Get, HostParam } from '@nestjs/common';
import { AppService } from './app.service';


@Controller({host: ':account.ideaplan.test'})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@HostParam('account') account: string): string {
    console.log(account);
    return this.appService.getHello();
  }
}
