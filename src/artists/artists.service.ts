import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create.artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dtos/update.artist.dto';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async getArtistById(artistId: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ artistId });
    
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create({
      artistId: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    await this.artistsRepository.save(newArtist);

    return newArtist;
  }

  async updataArtist(
    artistId: string,
    updateArtist: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ artistId });
    
    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return await this.artistsRepository.save(artist);
  }

  async deleteArtist(artistId: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ artistId });
    
    await this.artistsRepository.remove(artist);
  }
}
