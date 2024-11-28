import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put ,HttpCode,HttpStatus} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsAlbumEntity, FavsArtistEntity, FavsTrackEntity } from './entities/fav.entity';
import { LoggingService } from '../logging/logging.service';


@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService,private readonly loggingService: LoggingService) {}


  @Get()
  async findAll() {
    this.loggingService.log('Getting all Favorites','Favorites');
    return await this.favsService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id',ParseUUIDPipe) id: string): Promise<FavsTrackEntity> {
    this.loggingService.log(`Adding track ${id}`,'Tracks');
    return await this.favsService.addTrack(id);
  }
  @Post('album/:id')
  async addAlbum(@Param('id',ParseUUIDPipe) id: string): Promise<FavsAlbumEntity> {
    this.loggingService.log(`Adding album ${id}`,'Albums');
    return await this.favsService.addAlbum(id);
  }
  @Post('artist/:id')
  async addArtist(@Param('id',ParseUUIDPipe) id: string): Promise<FavsArtistEntity> {
    this.loggingService.log(`Adding artist ${id}`,'Artists');
    return await this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting artist ${id}`,'Artists');
    await this.favsService.deleteArtist(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting track ${id}`,'Tracks');
    await this.favsService.deleteTrack(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting album ${id}`,'Albums');
    await this.favsService.deleteAlbum(id);
  }

}
