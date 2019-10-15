import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import AppModule from './app.module';
import GlobalNotFoundExceptionFilter from './GlobalNotFoundException.filter';
import GlobalBadRequestErrorFilter from './GlobalBadRequestError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalNotFoundExceptionFilter());
  app.useGlobalFilters(new GlobalNotFoundExceptionFilter());
  app.useGlobalFilters(new GlobalBadRequestErrorFilter());
  app.enableCors();
  app.use(helmet());
  await app.listen(80);
}
bootstrap();
