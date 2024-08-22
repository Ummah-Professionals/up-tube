import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('api')
export class APIController {
  constructor(private readonly videosService: VideosService) {}

  @Get('feed')
  async getFeed(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('page_size', new DefaultValuePipe(50), ParseIntPipe) pageSize: number
  ) {
    return this.videosService.getFeed(page, pageSize);
  }

  @Get('watchVideo/:id')
  async getWatchVideo(@Param('id') id: string) {
    return this.videosService.getWatchVideo(id);
  }

  @Get('search')
  async search(@Query('searchQuery') searchQuery: string, @Query('page') page: number = 1, @Query('pageSize') pageSize: number = 25) {  
    const result = await this.videosService.searchVideos(searchQuery, page, pageSize);
    return result;
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
