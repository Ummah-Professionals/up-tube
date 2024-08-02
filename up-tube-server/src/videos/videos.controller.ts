import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('api')
export class FeedController {
  constructor(private readonly videosService: VideosService) {}

  @Get('feed')
  async getFeed(
    @Query('page') page: number = 1,
    @Query('page_size') pageSize: number = 50
  ) {
    return this.videosService.getFeed(page, pageSize);
  }

  @Get('watchVideo/:id')
  async getWatchVideo(@Param('id') id: string) {
    return this.videosService.getWatchVideo(id);
  }
}


@Controller('videos')
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
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
