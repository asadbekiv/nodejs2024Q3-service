import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateTrackDto } from './dtos/ceate.track.dto';
import { UpdateTrackDto } from './dtos/update.track.dto';
import { Track } from './track.entity';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async getTrackById(trackId: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ trackId });
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    return track;
  }

  async create(createTrack: CreateTrackDto): Promise<Track> {
    if (createTrack.artistId) {
      const artistExists = await this.artistsRepository.findOneBy({
        artistId: createTrack.artistId,
      });
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with ID ${createTrack.artistId} not found`,
        );
      }
    }
    if (createTrack.albumId) {
      const albumExists = await this.albumsRepository.findOneBy({
        albumId: createTrack.albumId,
      });
      if (!albumExists) {
        throw new NotFoundException(
          `Album with ID ${createTrack.albumId} not found`,
        );
      }
    }
    const newTrack = this.tracksRepository.create({
      trackId: uuidv4(),
      name: createTrack.name,
      artistId: createTrack.artistId,
      albumId: createTrack.albumId,
      duration: createTrack.duration,
    });
    await this.tracksRepository.save(newTrack);
    return newTrack;
  }

  async updateTrack(
    trackId: string,
    updateTrack: UpdateTrackDto,
  ): Promise<Track> {
    if (updateTrack.artistId) {
      const artistExists = await this.artistsRepository.findOneBy({
        artistId: updateTrack.artistId,
      });
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with ID ${updateTrack.artistId} not found`,
        );
      }
    }
    if (updateTrack.albumId) {
      const albumExists = await this.albumsRepository.findOneBy({
        albumId: updateTrack.albumId,
      });
      if (!albumExists) {
        throw new NotFoundException(
          `Album with ID ${updateTrack.albumId} not found`,
        );
      }
    }
    const track = await this.tracksRepository.findOneBy({ trackId });
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    track.name = updateTrack.name;
    track.artistId = updateTrack.artistId;
    track.albumId = updateTrack.albumId;
    track.duration = updateTrack.duration;

    return await this.tracksRepository.save(track);
  }

  async deleteTrack(trackId: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ trackId });

    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    await this.tracksRepository.remove(track);
  }

  async deleteArtist(artistId: string): Promise<void> {
    const track = await this.tracksRepository.find();

    track.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  async deleteAlbum(albumId: string): Promise<void> {
    const track = await this.tracksRepository.find();

    track.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
