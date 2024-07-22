import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(): { message: string } {
    return { message: 'hello world' };
  }
}

@Injectable()
export class AppService2 {
  getNumEmps(employees: number = 100): { message: string } {
    return { message: `there are currently ${employees} employees.` };
  }
}