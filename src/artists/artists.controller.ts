import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  HttpStatus,
  HttpCode, ParseUUIDPipe, NotFoundException,
} from '@nestjs/common';

import { CreateArtistDto } from './dtos/create.artist.dto';
import { ArtistsService } from './artists.service';
import { UpdateArtistDto } from './dtos/update.artist.dto';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';
import { FavsArtistEntity } from '../favs/entities/fav.entity';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistService: ArtistsService,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(FavsArtistEntity)
    private readonly favsArtistRepository: Repository<FavsArtistEntity>,
  
  ) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id',ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() body: CreateArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(body);
  }

  @Put(':id')
  async updateArtist(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() body: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updataArtist(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id',ParseUUIDPipe) id: string): Promise<void> {

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
