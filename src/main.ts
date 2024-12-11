import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

import { getSwaggerConfig } from './core/utils'; // Убедитесь, что путь правильный

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(process?.env.NODE_ENV === 'dev' ? { logger: true } : {}),
  );

  const cookiePlugin = fastifyCookie as unknown as any;

  app.register(cookiePlugin, {
    secret: 'my-secret', // for cookies signature
  } as FastifyCookieOptions);

  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000, '::', () => {
    console.log(`listen :::${process.env.PORT ?? 3000}, env: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
