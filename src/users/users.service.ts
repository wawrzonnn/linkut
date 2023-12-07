/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  findOne: any;
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string): Promise<User> {
// potem hashowanie 
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
