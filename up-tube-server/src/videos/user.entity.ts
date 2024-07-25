import { Video } from "src/videos/video.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    profile_pic_path: string;

    @OneToMany(() => Video, (video) => video.user)
    videos: Video[];
}