import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Eminem', description: 'Artist name' })
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Boolean condition of grammy' })
  grammy: boolean;
}
