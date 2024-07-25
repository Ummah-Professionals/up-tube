import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Video } from "./video.entity";

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
                where: { id: id },
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

    async populateWithVideos() {
        for (let i = 0; i < 1 /*500*/; i++) {
            await this.videoRepository.createQueryBuilder().insert().into(Video).values({
                //id:,
                title: 'mock_data',
                //user_id:,
                duration_seconds: 1200,
                //time_uploaded:,
                //thumbnail:,
                //video_path:,
                //num_of_views:,
                description: 'this is mock data'
            })
        }
    }
}