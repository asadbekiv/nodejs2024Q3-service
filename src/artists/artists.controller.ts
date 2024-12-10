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
import { updateArtistDto } from './dtos/update.artist.dto';
import { Artist } from './artist.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Artistes list',
    type: [Artist],
  })
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
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
  getArtistById(@Param() params: ArtistIdDto): Artist {
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
  createArtist(@Body() body: CreateArtistDto): Artist {
    return this.artistService.createArtist(body);
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
  @ApiBody({ type: updateArtistDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateArtist(
    @Param() params: ArtistIdDto,
    @Body() body: updateArtistDto,
  ): Artist {
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
  deleteArtist(@Param() params: ArtistIdDto): void {
    this.artistService.deleteArtist(params.id);
  }
}
