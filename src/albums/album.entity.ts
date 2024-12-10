import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p',
    description: 'Unique identifier for the album (UUID v4)',
  })
  id: string;

  @ApiProperty({
    example: 'A Night at the Opera',
    description: 'Name of the album',
  })
  name: string;

  @ApiProperty({ example: 1975, description: 'Release year of the album' })
  year: number;

  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Unique identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  artistId: string | null;
}
