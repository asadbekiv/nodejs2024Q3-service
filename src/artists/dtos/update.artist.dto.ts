import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: `Sherali Jo'rayev`,
    description: 'Artist name to be updated',
  })
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: false, description: 'Boolean condition of grammy' })
  grammy: boolean;
}
