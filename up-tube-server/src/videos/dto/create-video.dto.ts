//import { isString, IsNotEmpty } from "class-validator";

import { Timestamp } from "typeorm";

export class CreateVideoDto {
    id: string;

    title: string;

    user_id: string;

    duration_seconds: number;

    time_uploaded: Timestamp;

    thumbnail: string;

    video_path: string;

    num_views: number;

    description: string;
    
}