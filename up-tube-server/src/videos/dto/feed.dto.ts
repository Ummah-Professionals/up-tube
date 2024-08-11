import { VideoDto_Feed } from "./video.dto";

export class FeedDto {
    videos: VideoDto_Feed[];
    total_pages: number;
    current_page: number;
}