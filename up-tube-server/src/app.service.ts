import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(): { message: string } {
    return { message: 'Welcome to UpTube!' };
  }
}
