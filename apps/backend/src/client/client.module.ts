import { Module } from '@nestjs/common';
import ClientService from './services/client/client.service';
import ClientController from './client.controller';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
})
export default class ClientModule {}
