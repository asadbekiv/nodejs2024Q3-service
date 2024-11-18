import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
  ValidateIf
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'The Eminem Show', description: 'Album name' })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 2002, description: 'Album year' })
  year: number;

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @ApiProperty({
    example: '98ab7e33-32c9-45bd-b4db-13430443c67f',
    description: 'Artist Id in uuid foramt',
    nullable: true,
  })
  artistId: string | null;
}
