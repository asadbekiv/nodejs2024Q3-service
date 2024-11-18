import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/create.album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dtos/update.albumdto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }
  async getAlbumById(albumId: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ albumId });
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    return album;
  }
  async createAlbum(createAlbum: CreateAlbumDto): Promise<Album> {
    if (createAlbum.artistId) {
      const artistExists = await this.artistsRepository.findOneBy({
        artistId: createAlbum.artistId,
      });
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with ID ${createAlbum.artistId} not found`,
        );
      }
    }
    const newAlbum = this.albumsRepository.create({
      albumId: uuidv4(),
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId || null,
    });

    return await this.albumsRepository.save(newAlbum);
  }
  async updateAlbum(
    albumId: string,
    updateAlbum: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ albumId });
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId;

    return this.albumsRepository.save(album);
  }
  async deleteAlbum(albumId: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ albumId });
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    await this.albumsRepository.remove(album);
  }

  async deleteArtist(artistId: string): Promise<void> {
    const album = await this.albumsRepository.find();
    album.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
