import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { VideosService } from "./videos.service";

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

@Controller('/addVideo')
export class AddVideo {
    constructor(private readonly videosService: VideosService) {}

    //@Post()

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