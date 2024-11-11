import { ApiProperty } from '@nestjs/swagger';
export class Track {
  @ApiProperty({
    example: 'a3e1b9c3-2f2a-4d9c-8c3b-8a3b1c3d2f2a',
    description: 'Unique identifier for the track (UUID v4)',
  })
  id: string;

  @ApiProperty({
    example: 'Bohemian Rhapsody',
    description: 'Name of the track',
  })
  name: string;

  @ApiProperty({
    example: 'd7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8a',
    description:
      'Unique 476a0a6d-0861-496d-8692-2df1b4216269identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    example: 'e7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8c',
    description: 'Unique identifier of the album, refers to Album entity',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    example: 354,
    description: 'Duration of the track in seconds',
  })
  duration: number;
}
