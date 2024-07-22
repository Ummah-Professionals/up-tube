import { Controller, Get } from '@nestjs/common';
import { AppService, AppService2 } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  exampleMethod() {
    return this.appService.getGreeting();
  }
}

@Controller('/api2.0')
export class EmpController {
  constructor(private readonly appService2: AppService2) {}

  @Get()
  empMethod() {
    return this.appService2.getNumEmps();
  }
}
