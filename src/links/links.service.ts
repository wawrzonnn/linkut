/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as shortid from 'shortid';
import xss from 'xss';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async createLink(userId: number, originalUrl: string): Promise<any> {
    try {
      const cleanedUrl = xss(originalUrl);
      const shortUrl = shortid.generate();
      return await this.prisma.link.create({
        data: {
          originalUrl: cleanedUrl,
          shortUrl,
          userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error creating link',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
