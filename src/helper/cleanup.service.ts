import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class CleanupService {
  constructor(
    private readonly albumsServices: AlbumsService,
    private readonly tracksServices: TracksService,
    private readonly favoritesServices: FavoritesService,
  ) {}

  async cleanupArtist(id: string): Promise<void> {
    this.albumsServices.deleteArtist(id);
    this.tracksServices.deleteArtist(id);

    const favorites = await this.favoritesServices.getAllFavorites();

    const artist = favorites
      .flatMap((favorite) => favorite.artists) // Combine all tracks from all favorites
      .find((artist) => artist.artistId === id);
    if (artist) {
      this.favoritesServices.deleteArtistFromFavorites(id);
    }
  }

  async cleanupAlbum(id: string): Promise<void> {
    const favorites = await this.favoritesServices.getAllFavorites();

    const album = favorites
      .flatMap((favorite) => favorite.albums) // Combine all tracks from all favorites
      .find((album) => album.albumId === id);

    if (album) {
      this.favoritesServices.deleteAlbumFromFavorites(id);
    }
  }

  async cleanupTrack(id: string): Promise<void> {
    const favorites = await this.favoritesServices.getAllFavorites();

    const track = favorites
      .flatMap((favorite) => favorite.tracks) // Combine all tracks from all favorites
      .find((track) => track.trackId === id);

    if (track) {
      this.favoritesServices.deleteTrackFromFavorites(id);
    }
  }
}
