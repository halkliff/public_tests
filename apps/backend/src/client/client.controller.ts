import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  Res /* Post, Patch, Delete, */,
} from '@nestjs/common';
import { Response } from 'express';
import ClientService from './services/client/client.service';

@Controller('clients')
export default class ClientController {
  public constructor(private service: ClientService) {}

  @Get('/')
  public async getClients(
    @Query('page', ParseIntPipe) page = 0,
    @Query('offset', ParseIntPipe) offset = 10,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const clients = await this.service.getclients(page, offset);
      res.status(200).jsonp({
        ok: true,
        data: clients,
      });
    } catch (err) {
      res.status(500).jsonp({
        ok: false,
        msg: 'An unexpected error occurred. Please, try again later.',
        error: err,
      });
    }
  }
}
