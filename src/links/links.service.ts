/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as shortid from 'shortid';
import xss from 'xss';
import * as cron from 'node-cron';
import { Link } from '@prisma/client';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {
    this.startCleanupJob();
  }

  private startCleanupJob() {
    cron.schedule('0 0 * * *', async () => {
      await this.removeExpiredLinks();
    });
  }

  async createLink(userId: number, originalUrl: string): Promise<any> {
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 48);
      const cleanedUrl = xss(originalUrl);
      const shortUrl = shortid.generate();
      return await this.prisma.link.create({
        data: {
          originalUrl: cleanedUrl,
          shortUrl,
          userId,
          expiresAt,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error creating link',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOriginalUrl(shortUrl: string): Promise<string | null> {
    const link = await this.prisma.link.findUnique({
      where: { shortUrl },
    });
    return link ? link.originalUrl : null;
  }

  async findAllUserLinks(userId: number): Promise<any[]> {
    try {
      return await this.prisma.link.findMany({
        where: { userId },
        select: {
          shortUrl: true,
          originalUrl: true,
        },
      });
    } catch (error) {
      throw new Error('Unable to retrieve user links');
    }
  }

  private async removeExpiredLinks() {
    const now = new Date();
    await this.prisma.link.deleteMany({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });
  }

  async recordClick(linkId: number, referrer: string): Promise<void> {
    await this.prisma.linkStat.create({
      data: {
        linkId,
        referrer
      }
    });
  }
  
  async getLinkStats(linkId: number): Promise<any> {
    return await this.prisma.linkStat.findMany({
      where: { linkId },
      select: {
        clickedAt: true,
        referrer: true
      }
    });
  }

  async findLinkByShortUrl(shortUrl: string): Promise<Link | null> {
    return await this.prisma.link.findUnique({
      where: { shortUrl },
    });
  }
}
