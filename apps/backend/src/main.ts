import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import GlobalNotFoundExceptionFilter from './GlobalNotFoundException.filter';
import GlobalBadRequestErrorFilter from './GlobalBadRequestError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalNotFoundExceptionFilter());
  app.useGlobalFilters(new GlobalNotFoundExceptionFilter());
  app.useGlobalFilters(new GlobalBadRequestErrorFilter());
  await app.listen(80);
}
bootstrap();
