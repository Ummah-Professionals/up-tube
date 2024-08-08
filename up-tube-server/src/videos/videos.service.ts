import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "./entity/video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Injectable()
export class VideosService {
    constructor(@InjectRepository(Video) private readonly videoRepository: Repository<Video>) {}

    async getFeed(page: number, pageSize: number) {
        try {
            const [videos, total] = await this.videoRepository.findAndCount({
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
                    views: video.views,
                    description: video.description,
                })),
                total_pages: totalPages,
                current_page: page,
            }
        } catch (error) {
            return {
                "success": false,
                "status_message": "NO_VIDEOS_EXIST",
            }
        }
    }

    async getWatchVideo(id: string) {
        try {
            const video = await this.videoRepository.findOne({
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
                views: video.views,
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

    async getSearch(searchQuery: string, page: number) {
        const videos = await this.findAll();

        
    }

    async create(createVideoDto:CreateVideoDto) {
        const video = this.videoRepository.create(createVideoDto);
        return await this.videoRepository.create(createVideoDto);
    }

    async findAll() {
        return await this.videoRepository.find();
    }

    async findOne(id: string) {
        return await this.videoRepository.findOne({ where: { id } });
    }

    async update(id: string, updateVideoDto: UpdateVideoDto) {
        const video = await this.findOne(id);

        if(!video) {
            throw new NotFoundException();
        }

        Object.assign(video, updateVideoDto);

        return await this.videoRepository.save(video);
    }

    async remove(id: string) {
        const video = await this.findOne(id);

        if (!video) {
            throw new NotFoundException();
        }

        return await this.videoRepository.remove(video);
    }
}