import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Till I Collapse', description: 'Track name' })
  name: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Artist Id in uuid format',
    nullable: true,
  })
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Album Id in uuid format',
    nullable: true,
  })
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 8,
    description: 'Duration of track',
  })
  duration: number;
}
