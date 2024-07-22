import { Module } from '@nestjs/common';
import { AppController, EmpController } from './app.controller';
import { AppService, AppService2 } from './app.service';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [UsersModule, VideosModule],
  controllers: [AppController, EmpController],
  providers: [AppService, AppService2],
})
export class AppModule {}
