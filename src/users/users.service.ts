import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create.user.dto';
import { UpdatePasswordDto } from './dtos/update.user.dto';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import 'dotenv/config';
import * as process from 'node:process';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}



  async findByLoginAndPassword(login:string,password:string) {
    const user=await this.usersRepository.findOne({where:{login:login.trim()}})
    if(!user){
      return null
    }
    const isVaildPassword:boolean = await bcrypt.compare(password, user.password);
    return isVaildPassword ? user : null;
  }

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
    const hash = await bcrypt.hash(createUserDto.password,parseInt(process.env.CRYPT_SALT));
    const newUser = this.usersRepository.create({
      id: uuidv4(),
      login: createUserDto.login,
      password: hash,
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
    const hash = await bcrypt.hash(newPassword,parseInt(process.env.CRYPT_SALT));
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isVaildPassword:boolean = await bcrypt.compare(oldPassword, user.password);
    if (!isVaildPassword) {
      throw new ForbiddenException(
        'Incorrect old password.Please check it again !',
      );
    }
    user.version += 1;
    user.password = hash;
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
