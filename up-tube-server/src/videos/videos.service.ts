import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videosRepository: Repository<Video>
  ) {}

  async getFeed(page: number, pageSize: number) {
    try {
      const [videos, total] = await this.videosRepository.findAndCount({
        relations: ['user'],
        take: pageSize,
        skip: (page - 1) * pageSize,
        order: { time_uploaded: 'DESC' }
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        videos: videos.map(video => ({
          id: video.id,
          title: video.title,
          user_id: video.user.id,
          user_username: video.user.username,
          user_profile_pic_path: video.user.profile_pic_path,
          duration_seconds: video.duration_seconds,
          time_uploaded: video.time_uploaded,
          thumbnail: video.thumbnail,
          views: video.num_views,
          description: video.description
        })),
        total_pages: totalPages,
        current_page: page
      };
    } catch (error) {
        return {
          "success": false,
          "status_message": "NO_VIDEOS_EXIST"
        };
    }
  }

  async getWatchVideo(id: string) {
    try {
        const video = await this.videosRepository.findOne({
            where: { id },
            relations: ['user'],
        })
    
        return {
            id: video.id,
            title: video.title,
            user_id: video.user.id,
            user_username: video.user.username,
            user_profile_pic_path: video.user.profile_pic_path,
            duration_seconds: video.duration_seconds,
            time_uploaded: video.time_uploaded,
            thumbnail: video.thumbnail,
            video_path: video.video_path,
            views: video.num_views,
            description: video.description,
        }
    } catch (error) {
        return {
            "success": false,
            "status_message": "VIDEO_NOT_EXISTS",
            "video_id": id,
        }
    } 
}

async searchVideos(searchQuery: string, page: number, pageSize: number) {
  try {
    const [videos, total] = await this.videosRepository.findAndCount({
      where: { title: Like(`%${searchQuery}%`) },
      relations: ['user'],
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { time_uploaded: 'DESC' },
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      videos: videos.map(video => ({
        id: video.id,
        title: video.title,
        user_id: video.user.id,
        user_username: video.user.username,
        user_profile_pic_path: video.user.profile_pic_path,
        duration_seconds: video.duration_seconds,
        time_uploaded: video.time_uploaded,
        thumbnail: video.thumbnail,
        views: video.num_views,
        description: video.description,
      })),
      total_pages: totalPages,
      current_page: page,
    };
  } catch (error) {
    return {
      success: false,
      status_message: "SEARCH_FAILED",
    };
  }
}

  async create(createVideoDto: CreateVideoDto) {
    const video = this.videosRepository.create(createVideoDto);

    return await this.videosRepository.save(video);
  }

  async findAll() {
    return await this.videosRepository.find();
  }

  async findOne(id: string) {
    return await this.videosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.findOne(id);

    if (!video) {
      throw new NotFoundException();
    }

    Object.assign(video, updateVideoDto);

    return await this.videosRepository.save(video);
  }

  async remove(id: string) {
    const video = await this.findOne(id);

    if (!video) {
      throw new NotFoundException();
    }

    return await this.videosRepository.remove(video);
  }
}
