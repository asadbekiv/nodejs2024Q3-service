import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ParseUUIDPipe,
  ClassSerializerInterceptor,
  UseInterceptors
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dtos/update.user.dto';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) id:string): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.create(body);
  }

  @Put(':id')
  async updatePassword(
    @Param('id',ParseUUIDPipe) id:string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    return await this.usersService.delete(id);
  }
}
