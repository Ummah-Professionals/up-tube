
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Video {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.videos)
    user: User;

    @Column()
    duration_seconds: number;

    @CreateDateColumn()
    time_uploaded: Date;

    @Column()
    thumbnail: string;

    @Column()
    video_path: string;

    @Column({ default: 0})
    views: number;

    @Column('text')
    description:string;

}