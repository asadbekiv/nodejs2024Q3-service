import { IsUUID } from 'class-validator';
export class FavoritesIdDto {
  @IsUUID('4', { message: 'Invalid favorites ID format' })
  id: string;
}
