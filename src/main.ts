import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app';
import {
  DEFAULT_ADDRESS,
  DEFAULT_PORT,
  getSwaggerConfig,
  NodeEnv,
  printWelcome,
  Routes,
  UNKNOWN_INSTANCE,
} from './core';

const STAGE = process.env.NODE_ENV.toUpperCase() || UNKNOWN_INSTANCE;
const PORT = process.env.BACKEND_PORT ?? DEFAULT_PORT;
const ADDRESS = process.env.BACKEND_ADDRESS ?? DEFAULT_ADDRESS;
const isDevelop = process?.env.NODE_ENV === NodeEnv.Develop || process?.env.NODE_ENV === NodeEnv.Local;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(isDevelop ? { logger: true } : {}),
  );

  const cookiePlugin = fastifyCookie as unknown as any;

  app.register(cookiePlugin, {
    secret: process.env.COOKIE_SECRET,
  } as FastifyCookieOptions);

  app.setGlobalPrefix(Routes.ApiV1);

  if (isDevelop) {
    const config = getSwaggerConfig();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${Routes.ApiV1}/${Routes.Swagger}`, app, document);
  }

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT, ADDRESS, () => {
    printWelcome(STAGE, ADDRESS, PORT);
  });
}

bootstrap();
