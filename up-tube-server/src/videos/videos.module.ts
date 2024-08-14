import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { FeedController, VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideosController, FeedController],
  providers: [VideosService],
})
export class VideosModule {}
