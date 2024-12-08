import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(process?.env.NODE_ENV === "dev" ? { logger: true } : {})
  );
  await app.listen(3000, "::", () => {
    console.log(`listen :::${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
