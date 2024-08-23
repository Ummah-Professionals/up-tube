import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { User } from "src/users/entities/user.entity";
import { VideosService } from "./videos.service";
import { APIController, VideosController } from "./videos.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [APIController, VideosController],
  providers: [VideosService],
})
export class VideosModule {}
