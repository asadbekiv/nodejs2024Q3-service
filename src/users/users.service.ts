import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdatePasswordDto } from './dtos/update.user.dto';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  private users: User[] = [];

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
    const timestamp: number = Date.now();
    const newUser: User = {
      id: uuidv4(),
      login: CreateUserDto.login,
      password: CreateUserDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);

    return plainToClass(User, newUser);
  }

  updatePassword(userId: string, updatePassword: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePassword;
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

    return plainToClass(User, user);
  }
  delete(userId: string): void {
    const user = this.users.findIndex((user) => user.id === userId);
    if (user === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    this.users.splice(user, 1);
  }
}
