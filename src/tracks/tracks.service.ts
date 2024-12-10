import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateTrackDto } from './dtos/ceate.track.dto';
import { UpdateTrackDto } from './dtos/update.track.dto';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}
  private tracks: Track[] = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(trackId: string): any | null {
    const track = this.tracks.find((track) => track.id === trackId);
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    return track;
  }

  create(createTrack: CreateTrackDto): Track {
    if (createTrack.artistId) {
      const artistExists = this.artistsService.getArtistById(
        createTrack.artistId,
      );
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with ID ${createTrack.artistId} not found`,
        );
      }
    }
    if (createTrack.albumId) {
      const albumExists = this.albumsService.getAlbumById(createTrack.albumId);
      if (!albumExists) {
        throw new NotFoundException(
          `Album with ID ${createTrack.albumId} not found`,
        );
      }
    }
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrack.name,
      artistId: createTrack.artistId,
      albumId: createTrack.albumId,
      duration: createTrack.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }


  

  updateTrack(trackId: string, updateTrack: UpdateTrackDto): Track {
    if (updateTrack.artistId) {
      const artistExists = this.artistsService.getArtistById(
        updateTrack.artistId,
      );
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with ID ${updateTrack.artistId} not found`,
        );
      }
    }
    if (updateTrack.albumId) {
      const albumExists = this.albumsService.getAlbumById(updateTrack.albumId);
      if (!albumExists) {
        throw new NotFoundException(
          `Album with ID ${updateTrack.albumId} not found`,
        );
      }
    }
    const track = this.tracks.find((track) => track.id === trackId);
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    track.name = updateTrack.name;
    track.artistId = updateTrack.artistId;
    track.albumId = updateTrack.albumId;
    track.duration = updateTrack.duration;

    return track;
  }


  

  deleteTrack(trackId: string): void {
    const track = this.tracks.findIndex((track) => track.id === trackId);
    if (track == -1) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    this.tracks.splice(track, 1);
  }

  
}
