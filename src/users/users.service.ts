import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdatePasswordDto } from './dtos/update.user.dto';
import { UserByIdDto } from './dtos/userId.user.dto';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User {
    const user = this.users.find((user) => user.id == userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  create(CreateUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login: CreateUserDto.login,
      password: CreateUserDto.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(
        'Incorrect old password.Please check it again !',
      );
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }
  delete(userId: string): void {
    const user = this.users.findIndex((user) => user.id === userId);
    if (user === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    this.users.splice(user, 1);
  }
}
