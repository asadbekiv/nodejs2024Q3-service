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
import { LoggingService } from '../logging/logging.service';





@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly loggingService: LoggingService
  ) {}
  @Get()
  async getAllAlbums(): Promise<Album[]> {
    this.loggingService.log('Getting all albums','Albums');
    return await this.albumsService.getAllAlbums();
  }
  @Get(':id')
  async getAlbumById(@Param('id',ParseUUIDPipe) id: string): Promise<Album> {
    this.loggingService.log(`Getting album by id: ${id}`,'Albums');
    return await this.albumsService.getAlbumById(id);
  }
  @Post()
  async createAlbum(@Body() body: CreateAlbumDto): Promise<Album> {
    this.loggingService.log(`Creating album by name: ${body.name}`,'Albums');
    return await this.albumsService.createAlbum(body);
  }
  @Put(':id')
  async updateAlbum(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    this.loggingService.log(`Updating album : ${id}`,'Albums');
    return await this.albumsService.updateAlbum(id, body);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting album by id: ${id}`,'Albums');
    await this.albumsService.deleteAlbum(id);
  }
}
