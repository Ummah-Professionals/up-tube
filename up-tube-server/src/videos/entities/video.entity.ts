import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'videos' })
export class Video {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    title: string;

    @Column( { name: 'user_id', type: 'uuid' })
    userId: string;

    @ManyToOne(() => User, (user) => user.videos)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'int' })
    duration_seconds: number;

    @Column({ type: 'timestamp' })
    time_uploaded: Date;

    @Column({ type: 'varchar' })
    thumbnail: string;

    @Column({ type: 'varchar' })
    video_path: string;

    @Column({ type: 'int', default: 0 })
    num_views: number;

    @Column({ type: 'text' })
    description: string;
}
