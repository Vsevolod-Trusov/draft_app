import { DocumentBuilder } from '@nestjs/swagger';

const getSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle('ZUMI Backend documentation')
    .setDescription('ZUMI Platform')
    .setVersion('1.0')
    .addTag('mvp 1.0')
    .build();

export { getSwaggerConfig };
