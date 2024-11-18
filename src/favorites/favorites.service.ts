import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesResponse } from './favorite.entity';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { Track } from 'src/tracks/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(FavoritesResponse)
    private favoritesRepository: Repository<FavoritesResponse>,
  ) {}

  async getAllFavorites(): Promise<FavoritesResponse[]> {
    return await this.favoritesRepository.find({
      relations: ['artists', 'albums', 'tracks'], // Ensure relationships are loaded
    });
  }

  async AddTrackToFavorites(trackId: string): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['tracks'],
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites with ID ${trackId} not found`);
    }

    const track = await this.tracksRepository.findOneBy({ trackId: trackId });

    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    const isTrackAlreadyFavorite = favorites.tracks.some(
      (t) => t.trackId === trackId,
    );

    if (isTrackAlreadyFavorite) {
      throw new HttpException(
        `Track with ID ${trackId} is already in favorites`,
        HttpStatus.CONFLICT,
      );
    }

    // Add the track to favorites
    favorites.tracks.push(track);
    return await this.favoritesRepository.save(favorites);
  }

  async deleteTrackFromFavorites(trackId: string): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['tracks'],
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites not found`);
    }

    const trackIndex = favorites.tracks.findIndex(
      (track) => track.trackId === trackId,
    );
    if (trackIndex === -1) {
      throw new NotFoundException(
        `Track with ID ${trackId} not found in favorites`,
      );
    }

    favorites.tracks.splice(trackIndex, 1);

    return await this.favoritesRepository.save(favorites);
  }

  async AddAlbumToFavorites(albumId: string): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['albums'],
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites with ID ${albumId} not found`);
    }

    const album = await this.albumsRepository.findOneBy({ albumId: albumId });

    if (!album) {
      throw new NotFoundException(`Album with ID ${album} not found`);
    }

    const isAlbumAlreadyFavorite = favorites.albums.some(
      (t) => t.albumId === albumId,
    );

    if (isAlbumAlreadyFavorite) {
      throw new HttpException(
        `Track with ID ${albumId} is already in favorites`,
        HttpStatus.CONFLICT,
      );
    }

    // Add the track to favorites
    favorites.albums.push(album);
    return await this.favoritesRepository.save(favorites);
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['albums'],
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites not found`);
    }

    const albumIndex = favorites.albums.findIndex((e) => e.albumId === albumId);
    if (albumIndex === -1) {
      throw new NotFoundException(
        `Track with ID ${albumId} not found in favorites`,
      );
    }

    favorites.albums.splice(albumIndex, 1);

    return await this.favoritesRepository.save(favorites);
  }

  async AddArtistToFavorites(artistId: string): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['artists'],
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites with ID ${artistId} not found`);
    }

    const artist = await this.artistsRepository.findOneBy({
      artistId: artistId,
    });

    if (!artist) {
      throw new NotFoundException(`Track with ID ${artistId} not found`);
    }

    const isTrackAlreadyFavorite = favorites.tracks.some(
      (t) => t.artistId === artistId,
    );

    if (isTrackAlreadyFavorite) {
      throw new HttpException(
        `Track with ID ${artistId} is already in favorites`,
        HttpStatus.CONFLICT,
      );
    }

    // Add the track to favorites
    favorites.artists.push(artist);
    return await this.favoritesRepository.save(favorites);
  }

  async deleteArtistFromFavorites(
    artistId: string,
  ): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['artists'],
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites not found`);
    }

    const artistIndex = favorites.artists.findIndex(
      (e) => e.artistId === artistId,
    );
    if (artistIndex === -1) {
      throw new NotFoundException(
        `Track with ID ${artistId} not found in favorites`,
      );
    }

    favorites.artists.splice(artistIndex, 1);

    return await this.favoritesRepository.save(favorites);
  }
}
