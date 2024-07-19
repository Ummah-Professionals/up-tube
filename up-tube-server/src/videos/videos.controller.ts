import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideosService } from './videos.service';


@Controller('/videos')
export class VideosController {

    constructor(private readonly videosService: VideosService) {}

    @Get()
    findAll() {
        return this.videosService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        this.videosService.findOne(+id)
    }

    @Post()
    create(@Body() video: CreateVideoDto) {
        return video;
    }

}
