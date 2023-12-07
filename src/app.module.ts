/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [UsersModule, LinksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
