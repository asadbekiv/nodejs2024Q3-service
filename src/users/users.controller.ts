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
import {LoggingService} from '../logging/logging.service';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loggingService: LoggingService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    this.loggingService.log('Getting all users','Users');
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) id:string): Promise<User> {
    this.loggingService.log(`Getting user by ${id}`,id);
    return await this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    this.loggingService.log(`Creating User ${body.login}`,'User');
    return await this.usersService.create(body);
  }

  @Put(':id')
  async updatePassword(
    @Param('id',ParseUUIDPipe) id:string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    this.loggingService.log(`Updating User ${id}`,'User');
    return await this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting User ${id}`);
    return await this.usersService.delete(id);
  }
}
