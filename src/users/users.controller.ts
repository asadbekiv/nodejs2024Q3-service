import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create.user.dto';
import { UserByIdDto } from './dtos/userId.user.dto';
import { UsersService, User } from './users.service';
import { UpdatePasswordDto } from './dtos/update.user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  getUserById(@Param() params: UserByIdDto): User {
    return this.usersService.getUserById(params.id);
  }
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updataPassword(
    @Param() params: UserByIdDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): User {
    return this.usersService.updatePassword(params.id, updatePasswordDto);
  }
  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(204)
  async deleteUser(@Param() parmas: UserByIdDto): Promise<void> {
    return this.usersService.delete(parmas.id);
  }
}
