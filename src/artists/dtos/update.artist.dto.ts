import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class updateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
