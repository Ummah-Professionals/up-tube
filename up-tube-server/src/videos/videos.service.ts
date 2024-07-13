import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from '../../dto/create-video.dto';

@Injectable()
export class VideosService {
    private videos: CreateVideoDto[] = [];

    findAll() {
        return this.videos;
    }

    findOne(id: number) {
        return this.videos.find(video => video.id === id);
    }

    create(video: CreateVideoDto) {
        if (!this.videos.length) {
            video.id = 1; // Start ID from 1 if no videos are present
        } else {
            const videosByHighestId = [...this.videos].sort((a, b) => b.id - a.id);
            video.id = videosByHighestId[0].id + 1;
        }

        this.videos.push(video);
        return video;
    }
}


