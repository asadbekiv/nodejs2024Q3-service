import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create.artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dtos/update.artist.dto';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Track} from '../tracks/track.entity';
import  {Album} from '../albums/album.entity';
import {FavsArtistEntity} from '../favs/entities/fav.entity';


@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(FavsArtistEntity)
    private readonly favsArtistRepository: Repository<FavsArtistEntity>,
  
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist =this.artistsRepository.create({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    await this.artistsRepository.save(newArtist);

    return newArtist;
  }

  async updataArtist(
    id: string,
    updateArtist: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    
    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return await this.artistsRepository.save(artist);
  }


  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }


    await this.favsArtistRepository.remove({ id: artist.id });
    await this.albumsRepository.update({ artistId: id }, { artistId: null });
    await this.tracksRepository.update({ artistId: id }, { artistId: null });

    // Remove the artist
    await this.artistsRepository.remove(artist);
  }

}
