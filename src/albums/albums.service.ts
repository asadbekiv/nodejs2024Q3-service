import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/create.album.dto';
import { ArtistsService } from 'src/artists/artists.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dtos/update.albumdto';
import { Album } from './album.entity';


@Injectable()
export class AlbumsService {
  constructor(private readonly artistsService: ArtistsService) {}
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }
  getAlbumById(albumId: string): Album {
    const album = this.albums.find((album) => album.id === albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    return album;
  }
  createAlbum(createAlbum: CreateAlbumDto): Album {
    if (createAlbum.artistId) {
      const artistExists = this.artistsService.getArtistById(
        createAlbum.artistId,
      );
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with ID ${createAlbum.artistId} not found`,
        );
      }
    }
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }
  updateAlbum(albumId: string, updateAlbum: UpdateAlbumDto): Album {
    const album = this.albums.find((album) => album.id === albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId ;
    return album;
  }
  deleteAlbum(albumId: string): void {
    const album = this.albums.findIndex((album) => album.id === albumId);
    if (album === -1) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    this.albums.splice(album, 1);
  }
}
