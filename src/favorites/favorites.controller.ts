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
  getAllFavorites(): FavoritesResponse {
    return this.favoriteService.getAllFavorites();
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
  addTrackToFavorites(@Param() params: TrackIdDto): {
    message: string;
  } {
    return this.favoriteService.AddTrackToFavorites(params.id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete a track from Favorites' })
  @ApiParam({ name: 'id', description: 'Track Id' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  deleteTrackFromFavorites(@Param() params: TrackIdDto): void {
    const res = this.favoriteService.deleteTrackFromFavorites(params.id);
    if (res) {
      return;
    }
    throw new HttpException(
      `Track with ID ${params.id} is not in favorites`,
      HttpStatus.NOT_FOUND,
    );
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
  addAlbumToFavorites(@Param() params: AlbumIdDto): { message: string } {
    return this.favoriteService.AddAlbumToFavorites(params.id);
  }
  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete a album from Favorites' })
  @ApiParam({ name: 'id', description: 'Album Id' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param() params: AlbumIdDto): void {
    const res = this.favoriteService.deleteAlbumFromFavorites(params.id);
    if (res) {
      return;
    }
    throw new HttpException(
      `Album with ID ${params.id} is not in favorites`,
      HttpStatus.NOT_FOUND,
    );
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
  addArtistToFavorites(@Param() params: ArtistIdDto): { message: string } {
    return this.favoriteService.AddArtistToFavorites(params.id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete a Artist from Favorites' })
  @ApiParam({ name: 'id', description: 'Artist Id' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  deleteArtistFromFavorites(@Param() params: ArtistIdDto): void {
    const res = this.favoriteService.deleteArtistFromFavorites(params.id);
    if (res) {
      return;
    }
    throw new HttpException(
      `Artist with ID ${params.id} is not in favorites`,
      HttpStatus.NOT_FOUND,
    );
  }
}
