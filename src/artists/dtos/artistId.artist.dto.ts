import { IsUUID } from 'class-validator';

export class ArtistIdDto {
  @IsUUID('4', { message: 'Invalid artist ID format' })
  id: string;
}
