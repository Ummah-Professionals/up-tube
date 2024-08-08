import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entity/video.entity";
import { User } from "src/users/user.entity";
import { VideosService } from "./videos.service";
import { ApiController, VideosController } from "./videos.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [ApiController, VideosController],
  providers: [VideosService],
})
export class VideosModule {}
