/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Req, Get, Param, NotFoundException, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Response } from 'express';

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

  @Get(':shortUrl')
  async redirectToOriginal(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = await this.linksService.findOriginalUrl(shortUrl);

    if (!originalUrl) {
      throw new NotFoundException('Link not found');
    }

    res.redirect(301, originalUrl);
  }
  
}