import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';

import { CreateArtistDto } from './dtos/create.artist.dto';
import { ArtistsService } from './artists.service';
import { ArtistIdDto } from './dtos/artistId.artist.dto';
import { UpdateArtistDto } from './dtos/update.artist.dto';
import { Artist } from './artist.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CleanupService } from 'src/helper/cleanup.service';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistService: ArtistsService,
    private readonly cleanupsService: CleanupService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Artistes list',
    type: [Artist],
  })
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by Id.' })
  @ApiParam({ name: 'id', description: 'artist Id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Artists list',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Req Body does not contains required fields !',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getArtistById(@Param() params: ArtistIdDto): Promise<Artist> {
    return this.artistService.getArtistById(params.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new artist.' })
  @ApiResponse({
    status: 201,
    description: 'Artist created successfully.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Req Body does not contains required fields !',
  })
  @ApiBody({ type: CreateArtistDto })
  async createArtist(@Body() body: CreateArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({ name: 'id', description: 'Artist Id' })
  @ApiResponse({
    status: 200,
    description: 'Artist update successfully',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid uuid',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found.',
  })
  @ApiBody({ type: UpdateArtistDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateArtist(
    @Param() params: ArtistIdDto,
    @Body() body: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updataArtist(params.id, body);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a artist' })
  @ApiParam({ name: 'id', description: 'Artist Id' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(204)
  async deleteArtist(@Param() params: ArtistIdDto): Promise<void> {
    this.artistService.deleteArtist(params.id);
    this.cleanupsService.cleanupArtist(params.id);
  }
}
