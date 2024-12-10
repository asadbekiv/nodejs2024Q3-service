import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  HttpCode, ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dtos/create.album.dto';
import { UpdateAlbumDto } from './dtos/update.albumdto';
import { Album } from './album.entity';




@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
  ) {}
  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumsService.getAllAlbums();
  }
  @Get(':id')
  async getAlbumById(@Param('id',ParseUUIDPipe) id: string): Promise<Album> {
    return await this.albumsService.getAlbumById(id);
  }
  @Post()
  async createAlbum(@Body() body: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.createAlbum(body);
  }
  @Put(':id')
  async updateAlbum(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.updateAlbum(id, body);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    await this.albumsService.deleteAlbum(id);
  }
}
