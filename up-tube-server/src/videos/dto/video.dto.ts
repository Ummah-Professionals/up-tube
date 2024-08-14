export class VideoDto_Feed {
    id: string;
    title: string;
    user_id: string;
    user_profile_pic_path: string;
    duration_seconds: number;
    time_uploaded: Date;
    thumbnail: string;
    views: number;
    description: string;
}

export class VideoDto_WatchVideo {
    id: string;
    title: string;
    user_id: string;
    user_username: string;
    user_profile_pic_path: string;
    duration_seconds: number;
    time_uploaded: Date;
    thumbnail: string;
    video_path: string;
    views: number;
    description: string;
}