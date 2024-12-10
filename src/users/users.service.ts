import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create.user.dto';
import { UpdatePasswordDto } from './dtos/update.user.dto';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers():Promise<User[]> {
    let users=await this.usersRepository.find()
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const newUser = this.usersRepository.create({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updatePassword(
    id: string,
    updatePassword: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePassword;

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(
        'Incorrect old password.Please check it again !',
      );
    }
    user.version += 1;
    user.password = newPassword;
    user.updatedAt = Date.now();

    return await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
