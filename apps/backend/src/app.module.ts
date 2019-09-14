import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import AppController from './app.controller';
import AppService from './app.service';
import ClientModule from './client/client.module';

@Module({
  imports: [
    ClientModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
