/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}