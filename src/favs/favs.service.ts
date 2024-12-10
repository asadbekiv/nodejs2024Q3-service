import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {FavsTrackEntity,FavsArtistEntity,FavsAlbumEntity} from './entities/fav.entity';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsArtistEntity)
    private readonly  favsartistsRepository: Repository<FavsArtistEntity>,
    @InjectRepository(FavsAlbumEntity)
    private readonly favsalbumsRepository: Repository<FavsAlbumEntity>,
    @InjectRepository(FavsTrackEntity)
    private readonly favstracksRepository: Repository<FavsTrackEntity>,



    @InjectRepository(Track)
    private readonly trackRepository:Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,


    ) {}



  async getAll(){
    const artistIds:FavsArtistEntity[] = await this.favsartistsRepository.find();
    const albumIds:FavsAlbumEntity[] = await this.favsalbumsRepository.find();
    const trackIds:FavsTrackEntity[] = await this.favstracksRepository.find();


    const artists:Artist[] = [];
    for (let i=0; i<artistIds.length; ++i) {
      artists.push(await this.artistRepository.findOneBy({ id: artistIds[i].id }))
    }


    const albums:Album[] = [];
    for (let i=0; i<albumIds.length; ++i) {
      albums.push(await this.albumRepository.findOneBy({ id: albumIds[i].id }))
    }

    const tracks:Track[] = [];
    for (let i=0; i<trackIds.length; ++i) {
      tracks.push(await this.trackRepository.findOneBy({ id: trackIds[i].id }))
    }


    return {
      artists: artists,
      tracks: tracks,
      albums: albums,
    }
  }




  async addTrack(id:string):Promise<Track>{
    const value:Track=await this.trackRepository.findOneBy({id});

    if (value === null) {
      throw new UnprocessableEntityException();
    }

    await this.favstracksRepository.save({id:value.id})
    return value

  }

  async addAlbum(id:string):Promise<Album>{
    const value:Album=await this.albumRepository.findOneBy({id});
    if (value === null) {
      throw new UnprocessableEntityException();
    }
    await this.favsalbumsRepository.save({id:value.id})
    return value

  }

  async addArtist(id:string):Promise<Artist>{
    const value:Artist=await this.artistRepository.findOneBy({id});
    if (value === null) {
      throw new UnprocessableEntityException();
    }
    await this.favsartistsRepository.save({id:value.id})
    return value
  }


  async deleteAlbum(id:string):Promise<void> {
    const value:FavsAlbumEntity=await this.favsalbumsRepository.findOneBy({id});
    if (value === null) {
      throw new NotFoundException();
    }
    await this.favsalbumsRepository.remove(value);
  }

  async deleteArtist(id:string):Promise<void> {
    const value:FavsArtistEntity=await this.favsartistsRepository.findOneBy({id});
    if (value === null) {
      throw new UnprocessableEntityException();
    }
    await this.favsartistsRepository.remove(value)
  }


  async deleteTrack(id:string):Promise<void> {
    const value:FavsTrackEntity=await this.favstracksRepository.findOneBy({id});
    if (value === null) {
      throw new NotFoundException();
    }
    await this.favstracksRepository.remove(value)
  }

}
