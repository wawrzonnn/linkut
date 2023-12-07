/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '60s'},
}),
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
