import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videosRepository: Repository<Video>
    // @InjectRepository(User)
    // private readonly usersRepository: Repository<User>
  ) {}
  async create(createVideoDto: CreateVideoDto) {
    // const user = await this.usersRepository.findOne({ where: { id: createVideoDto.user_id } });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    // const { user_id: userId, ...videoData } = createVideoDto;
    // const video = this.videosRepository.create(videoData);
    // video.user = user;
    const video = this.videosRepository.create(createVideoDto);

    return await this.videosRepository.save(video);
  }

  async findAll() {
    return await this.videosRepository.find();
  }

  async findOne(id: string) {
    return await this.videosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.findOne(id);

    if (!video) {
      throw new NotFoundException();
    }

    // if (updateVideoDto.user_id) {
    //   const user = await this.usersRepository.findOne({ where: { id: updateVideoDto.user_id } });
    //   if (!user) {
    //     throw new NotFoundException('User not found');
    //   }
    //   video.user = user;
    // }

    Object.assign(video, updateVideoDto);

    return await this.videosRepository.save(video);
  }

  async remove(id: string) {
    const video = await this.findOne(id);

    if (!video) {
      throw new NotFoundException();
    }

    return await this.videosRepository.remove(video);
  }
}
