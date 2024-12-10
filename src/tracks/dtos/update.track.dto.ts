import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Godzilla', description: 'Track name' })
  name: string;
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Artist Id in uuid format',
    nullable: true,
  })
  artistId: string | null;
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Album Id in uuid format',
    nullable: true,
  })
  albumId: string | null; // refers to Album
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 5,
    description: 'Duration of track',
  })
  duration: number;
}
