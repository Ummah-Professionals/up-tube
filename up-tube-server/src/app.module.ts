import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Video } from './videos/entity/video.entity';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2004',
      database: 'uptube',
      entities: [User, Video],
      synchronize: false,
      autoLoadEntities: true,
    }),
    VideosModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
