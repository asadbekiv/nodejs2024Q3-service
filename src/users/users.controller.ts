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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create.user.dto';
import { UserIdDto } from './dtos/userId.user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dtos/update.user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Gets all Users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Users list',
    type: [User],
  })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiParam({ name: 'id', description: 'User Id' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getUserById(@Param() params: UserIdDto): Promise<User> {
    return await this.usersService.getUserById(params.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Req Body does not contains required fields !',
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User Id' })
  @ApiResponse({
    status: 200,
    description: 'User password updated successfully.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid uuid',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiBody({ type: UpdatePasswordDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updatePassword(
    @Param() params: UserIdDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.usersService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User Id' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(204)
  async deleteUser(@Param() parmas: UserIdDto): Promise<void> {
    return await this.usersService.delete(parmas.id);
  }
}
