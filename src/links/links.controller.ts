/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Response, Request } from 'express';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLink(@Req() req: any, @Body() createLinkDto: CreateLinkDto) {
    const user = req.user;
    const link = await this.linksService.createLink(
      user.userId,
      createLinkDto.originalUrl,
    );
    return link;
  }

  @Get(':shortUrl')
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const link = await this.linksService.findLinkByShortUrl(shortUrl);

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    const referrer = (req.headers as { referer?: string }).referer ?? 'direct';
    await this.linksService.recordClick(link.id, referrer);

    res.redirect(301, link.originalUrl);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/mylinks')
  async getUserLinks(@Req() req: any) {
    const user = req.user;
    return await this.linksService.findAllUserLinks(user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('stats/:linkId')
  async getLinkStats(@Param('linkId') linkId: number) {
    return await this.linksService.getLinkStats(linkId);
  }
}
