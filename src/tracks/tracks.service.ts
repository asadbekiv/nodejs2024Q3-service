import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dtos/ceate.track.dto';
import { UpdateTrackDto } from './dtos/update.track.dto';
import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsTrackEntity } from '../favs/entities/fav.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(FavsTrackEntity)
    private favsTracksRepository: Repository<FavsTrackEntity>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  async create(createTrack: CreateTrackDto): Promise<Track> {
    const newTrack = this.tracksRepository.create({
      id: uuidv4(),
      name: createTrack.name,
      artistId: createTrack.artistId,
      albumId: createTrack.albumId,
      duration: createTrack.duration,
    });
    await this.tracksRepository.save(newTrack);
    return newTrack;
  }

  async updateTrack(
    id: string,
    updateTrack: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    track.name = updateTrack.name;
    track.artistId = updateTrack.artistId;
    track.albumId = updateTrack.albumId;
    track.duration = updateTrack.duration;

    return await this.tracksRepository.save(track);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.favsTracksRepository.remove({id:track.id});
    await this.tracksRepository.remove(track);
  }

}
