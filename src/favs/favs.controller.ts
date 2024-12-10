import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put ,HttpCode,HttpStatus} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsAlbumEntity, FavsArtistEntity, FavsTrackEntity } from './entities/fav.entity';


@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}


  @Get()
  async findAll() {
    return await this.favsService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id',ParseUUIDPipe) id: string): Promise<FavsTrackEntity> {
    return await this.favsService.addTrack(id);
  }
  @Post('album/:id')
  async addAlbum(@Param('id',ParseUUIDPipe) id: string): Promise<FavsAlbumEntity> {
    return await this.favsService.addAlbum(id);
  }
  @Post('artist/:id')
  async addArtist(@Param('id',ParseUUIDPipe) id: string): Promise<FavsArtistEntity> {
    return await this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.deleteArtist(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.deleteTrack(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.deleteAlbum(id);
  }

}
