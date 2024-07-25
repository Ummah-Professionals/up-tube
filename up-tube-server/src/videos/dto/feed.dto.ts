import { VideoDto_feed } from "../video.dto";

export class FeedDto {
    videos: VideoDto_feed[];
    total_pages: number;
    current_page: number;
}
