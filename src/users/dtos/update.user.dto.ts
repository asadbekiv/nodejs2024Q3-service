import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test12345', description: 'Old password of User' })
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test5321', description: 'New password of User' })
  newPassword: string;
}
