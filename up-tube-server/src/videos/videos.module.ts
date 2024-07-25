import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./video.entity";
import { User } from "./user.entity";
import { VideosService } from "./videos.service";
import { FeedController, WatchVideoController } from "./videos.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [FeedController, WatchVideoController],
  providers: [VideosService],
})
export class VideosModule {}
