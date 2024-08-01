import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Controller('/feed')
export class FeedController {
    constructor(private readonly videosService: VideosService) {}

    @Get()
    async getFeed(
        @Query('page') page: number = 1,
        @Query('page_size') pageSize: number = 50,
    ) {
        return this.videosService.getFeed(page, pageSize);
    }
}

@Controller('/watchVideo')
export class WatchVideoController {
    constructor(private readonly videosService: VideosService) {}

    @Get(':id')
    async getWatchVideo(@Param('id') id: string) {
        return this.videosService.getWatchVideo(id);
    }
}

@Controller('/populateWithVideos')
export class populateWithVideos {
    constructor(private readonly videosService: VideosService) {}

    @Post()
    async populateWithVideos() {
        this.videosService.populateWithVideos();
        
        return console.log("succeeded in populating with videos");
    }
}

@Controller('/videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) {}

    @Post()
    create(@Body() createVideoDto: CreateVideoDto) {
        return this.videosService.create(createVideoDto);
    }

    @Get()
    findAll() {
        return this.videosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
        return this.videosService.update(id, updateVideoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.videosService.remove(id);
    }
}