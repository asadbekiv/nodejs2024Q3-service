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
  async getAlbumById(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }
  async createAlbum(createAlbum: CreateAlbumDto): Promise<Album> {
    
    const newAlbum = this.albumsRepository.create({
      id: uuidv4(),
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId || null,
    });

    return await this.albumsRepository.save(newAlbum);
  }
  async updateAlbum(
    id: string,
    updateAlbum: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId;

    return this.albumsRepository.save(album);
  }
  async deleteAlbum(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.albumsRepository.remove(album);
  }

  
}
