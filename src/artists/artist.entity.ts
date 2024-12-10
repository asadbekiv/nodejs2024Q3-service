import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Unique identifier for the artist (UUID v4)',
  })
  id: string;

  @ApiProperty({
    example: 'Freddie Mercury',
    description: 'Name of the artist',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the artist has won a Grammy award',
  })
  grammy: boolean;
}
