import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entity/video.entity";
import { User } from "src/users/entity/user.entity";
import { VideosService } from "./videos.service";
import { APIController, VideosController } from "./videos.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [APIController, VideosController],
  providers: [VideosService],
})
export class VideosModule {}
