import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException("A user using this email is already registered");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // a 10 time hashing
    const userToRegister = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword
      },
    });
    return {
      id: userToRegister.id,
      email: userToRegister.email,
      password: '**********',
      createdAt: userToRegister.createdAt,
      updatedAt: userToRegister.updatedAt
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
