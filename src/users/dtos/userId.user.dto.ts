import { IsUUID } from 'class-validator';

export class UserByIdDto {
  @IsUUID('4', { message: 'Invalid user ID format' })
  id: string;
}
