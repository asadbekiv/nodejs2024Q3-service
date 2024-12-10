import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create.artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { updateArtistDto } from './dtos/update.artist.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(artistId: string): Artist {
    const artist = this.artists.find((artist) => artist.id === artistId);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found `);
    }
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);

    return newArtist;
  }

  updataArtist(artistId: string, updateArtist: updateArtistDto): Artist {
    const artist = this.artists.find((artist) => artist.id === artistId);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found `);
    }
    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return artist;
  }

  deleteArtist(artistId: string): void {
    const artist = this.artists.findIndex((artist) => artist.id === artistId);
    if (artist === -1) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
    this.artists.splice(artist, 1);
  }
}
