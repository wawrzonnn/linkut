/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { UsersModule } from '../users/users.module';
import { MyLogger } from 'src/logger.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [LinksController],
  providers: [LinksService, MyLogger, PrismaService],
})
export class LinksModule {}
