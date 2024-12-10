import { IsUUID } from 'class-validator';

export class UserIdDto {
  @IsUUID('4', { message: 'Invalid user ID format' })
  id: string;
}
