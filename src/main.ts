import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getSwaggerConfig } from './core';

const STAGE = process.env.NODE_ENV.toUpperCase();
const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(process?.env.NODE_ENV === 'dev' ? { logger: true } : {}),
  );

  const cookiePlugin = fastifyCookie as unknown as any;

  app.register(cookiePlugin, {
    secret: 'my-secret',
  } as FastifyCookieOptions);

  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(PORT, '::', () => {
    console.log(`
      ---------------------------------------------------
      [ZUMI-BACKEND-${STAGE}] address: :: port:${PORT}
      ---------------------------------------------------`);
  });
}

bootstrap();
