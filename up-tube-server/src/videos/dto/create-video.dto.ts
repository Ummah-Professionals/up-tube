export class CreateVideoDto {
    title: string;
    userId: string;
    duration_seconds: number;
    time_uploaded: Date;
    thumbnail: string;
    video_path: string;
    num_views: number;
    description: string;
}
