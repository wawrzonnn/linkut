/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as shortid from 'shortid';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async createLink(userId: number, originalUrl: string): Promise<any> {
    const shortUrl = shortid.generate();
    const link = await this.prisma.link.create({
      data: {
        originalUrl,
        shortUrl,
        userId,
      },
    });
    return link;
  }
}
