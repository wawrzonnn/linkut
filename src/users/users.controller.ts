/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MyLogger } from 'src/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private logger: MyLogger
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto.email, createUserDto.password);
    this.logger.log(`New user registered: ${newUser.email}`);

    return newUser;
  }
  

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req, @Res({ passthrough: true }) response: Response) {
    const jwt = await this.authService.login(req.user);
    response.cookie('jwt', jwt.access_token, { httpOnly: true });
    this.logger.log(`User ${req.user.email} logged in`);
    return req.user;
  }
}
