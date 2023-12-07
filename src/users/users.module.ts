/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { MyLogger } from 'src/logger.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    PassportModule,
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '60s'},
}),
  ],
  providers: [UsersService, PrismaService, MyLogger, AuthService],
  controllers: [UsersController]
})
export class UsersModule {}
