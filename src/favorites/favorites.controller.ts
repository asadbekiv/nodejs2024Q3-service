import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorite.entity';
import { TrackIdDto } from 'src/tracks/dtos/trackId.track.dto';
import { AlbumIdDto } from 'src/albums/dtos/albumId.album.dto';
import { ArtistIdDto } from 'src/artists/dtos/artistId.artist.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Favorites list',
  })
  async getAllFavorites(): Promise<FavoritesResponse[]> {
    return await this.favoriteService.getAllFavorites();
  }
  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to Favorites' })
  @ApiParam({ name: 'id', description: 'Track Id' })
  @ApiResponse({
    status: 201,
    description: 'Track added successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invaild uuid',
  })
  @ApiResponse({
    status: 422,
    description: 'Track does not exsist.',
  })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async addTrackToFavorites(
    @Param() params: TrackIdDto,
  ): Promise<FavoritesResponse> {
    console.log(params);

    return await this.favoriteService.AddTrackToFavorites(params.id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete a track from Favorites' })
  @ApiParam({ name: 'id', description: 'Track Id' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  async deleteTrackFromFavorites(
    @Param() params: TrackIdDto,
  ): Promise<FavoritesResponse> {
    return await this.favoriteService.deleteTrackFromFavorites(params.id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to Favorites' })
  @ApiParam({ name: 'id', description: 'Album Id' })
  @ApiResponse({
    status: 201,
    description: 'Album added successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invaild uuid',
  })
  @ApiResponse({
    status: 422,
    description: 'Album does not exsist.',
  })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async addAlbumToFavorites(
    @Param() params: AlbumIdDto,
  ): Promise<FavoritesResponse> {
    return await this.favoriteService.AddAlbumToFavorites(params.id);
  }
  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete a album from Favorites' })
  @ApiParam({ name: 'id', description: 'Album Id' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async deleteAlbumFromFavorites(
    @Param() params: AlbumIdDto,
  ): Promise<FavoritesResponse> {
    return await this.favoriteService.deleteAlbumFromFavorites(params.id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to Favorites' })
  @ApiParam({ name: 'id', description: 'Artist Id' })
  @ApiResponse({
    status: 201,
    description: 'Artist added successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invaild uuid',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist does not exsist.',
  })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async addArtistToFavorites(
    @Param() params: ArtistIdDto,
  ): Promise<FavoritesResponse> {
    return await this.favoriteService.AddArtistToFavorites(params.id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete a Artist from Favorites' })
  @ApiParam({ name: 'id', description: 'Artist Id' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async deleteArtistFromFavorites(
    @Param() params: ArtistIdDto,
  ): Promise<FavoritesResponse> {
    return await this.favoriteService.deleteArtistFromFavorites(params.id);
  }
}
