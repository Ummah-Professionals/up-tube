import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { VideosModule } from './videos/videos.module';
import { UsersService } from './users/users.service';
import { VideosService } from './videos/videos.service';
import { UsersController } from './users/user.controller';
import { VideosController } from './videos/videos.controller';
import { Video } from './videos/entity/video.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true
      }),
    }),
    TypeOrmModule.forFeature([User, Video]),
    UsersModule,
    VideosModule
  ],
  controllers: [AppController, VideosController, UsersController],
  providers: [AppService, UsersService, VideosService],
})
export class AppModule {}
