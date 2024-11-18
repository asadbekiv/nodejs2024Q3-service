import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Kamikaze', description: 'Album name' })
  name: string;
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 2018, description: 'Album year' })
  year: number;
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '10ab7e33-32c9-45bd-b4db-13430443c67f',
    description: 'Artist Id in uuid foramt',
    nullable: true,
  })
  artistId: string | null;
}
