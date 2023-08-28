import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useLogger(logger);
  const port = parseInt(process.env.PORT, 10) || 8080;
  const host = '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();
