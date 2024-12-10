import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesResponse } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  private favorites: FavoritesResponse = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAllFavorites(): FavoritesResponse {
    return this.favorites;
  }
  AddTrackToFavorites(favoritesId: string): { message: string } {
    try {
      const track = this.tracksService.getTrackById(favoritesId);
      this.favorites.tracks.push(track);
      return { message: 'Track add to favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Track is not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  deleteTrackFromFavorites(trackId: string): boolean {
    const trackIndex = this.favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );

    if (trackIndex === -1) {
      return false;
    }
    this.favorites.tracks.splice(trackIndex, 1);
    return true;
  }

  AddAlbumToFavorites(albumId: string): { message: string } {
    try {
      const album = this.albumsService.getAlbumById(albumId);
      this.favorites.albums.push(album);
      return { message: 'Album add to favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Album is not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  deleteAlbumFromFavorites(albumId: string): boolean {
    const albumIndex = this.favorites.albums.findIndex(
      (track) => track.id === albumId,
    );

    if (albumIndex === -1) {
      return false;
    }
    this.favorites.albums.splice(albumIndex, 1);
    return true;
  }

  AddArtistToFavorites(artistId: string): { message: string } {
    try {
      const artist = this.artistsService.getArtistById(artistId);
      this.favorites.artists.push(artist);
      return { message: 'Artist add to favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Artist is not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  deleteArtistFromFavorites(artistId: string): boolean {
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );

    if (artistIndex === -1) {
      return false;
    }
    this.favorites.artists.splice(artistIndex, 1);
    return true;
  }
}
