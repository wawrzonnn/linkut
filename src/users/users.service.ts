/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MyLogger } from 'src/logger.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private logger: MyLogger) {}

  async createUser(email: string, password: string): Promise<User> {
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        'Account with this email address already exists',
      );
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    this.logger.log(`Creating user with email: ${email}`);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
