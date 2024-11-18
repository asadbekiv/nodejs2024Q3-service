import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Michael Jackson',
    description: 'Login name  of the User',
  })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test12345', description: 'User set password' })
  password: string;
}
