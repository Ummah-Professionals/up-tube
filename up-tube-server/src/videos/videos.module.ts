import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entity/video.entity";
import { User } from "src/users/user.entity";
import { VideosService } from "./videos.service";
import { FeedController, VideosController, WatchVideoController } from "./videos.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [FeedController, WatchVideoController, VideosController],
  providers: [VideosService],
})
export class VideosModule {}
