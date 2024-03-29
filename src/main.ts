/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { rateLimit } from 'express-rate-limit';
import { MyLogger } from './logger.service';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true
    })
  const logger = new MyLogger();

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      handler: function (req, res /*, next */) {
        res.status(429).json({
          error: "Too many requests, please try again later."
        });
      }
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => new BadRequestException(errors),
  }));
  await app.listen(4000, () => logger.log('Server started on port 4000'));

process.on('SIGINT', () => {
  logger.log('Server is shutting down');
  process.exit();
});

}
bootstrap();
