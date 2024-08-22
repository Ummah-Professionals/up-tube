import { Video } from "src/videos/entity/video.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( { type: 'varchar', unique: true })
    username: string;

    @Column( {type: 'varchar' })
    profile_pic_path: string;

    @OneToMany(() => Video, (video) => video.user)
    videos: Video[];
}