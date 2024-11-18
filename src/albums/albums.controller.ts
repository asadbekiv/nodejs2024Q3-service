import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumIdDto } from './dtos/albumId.album.dto';
import { CreateAlbumDto } from './dtos/create.album.dto';
import { UpdateAlbumDto } from './dtos/update.albumdto';
import { Album } from './album.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';


@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumService: AlbumsService,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get all albums.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Albums list',
    type: [Album],
  })
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumService.getAllAlbums();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get album by Id.' })
  @ApiParam({ name: 'id', description: 'album Id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Albums list',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invaild uuid',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getAlbumById(@Param() parmas: AlbumIdDto): Promise<Album> {
    return await this.albumService.getAlbumById(parmas.id);
  }
  @Post()
  @ApiOperation({ summary: 'Create a new album.' })
  @ApiResponse({
    status: 201,
    description: 'Album created successfully.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Req Body does not contains required fields !',
  })
  @ApiBody({ type: CreateAlbumDto })
  async createAlbum(@Body() body: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(body);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update album.' })
  @ApiParam({ name: 'id', description: 'Album Id' })
  @ApiResponse({
    status: 200,
    description: 'Album update successfully',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid uuid',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found.',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateAlbum(
    @Param() params: AlbumIdDto,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.updateAlbum(params.id, body);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a album' })
  @ApiParam({ name: 'id', description: 'Album Id' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(204)
  async deleteAlbum(@Param() params: AlbumIdDto): Promise<void> {
    await this.albumService.deleteAlbum(params.id);
  }
}
