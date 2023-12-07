/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLink(@Req() req: any, @Body() createLinkDto: CreateLinkDto) {
    const user = req.user;
    const link = await this.linksService.createLink(user.userId, createLinkDto.originalUrl);
    return link;
  }
}