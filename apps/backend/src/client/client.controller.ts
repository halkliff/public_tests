import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Patch,
  Put,
  Delete,
  Res,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { Client, NetworkResponse } from '@cacdigital-lib/types';
import ClientService from './services/client/client.service';
import UserAlreadyExistsError from './services/client/UserAlreadyExists.error';
import UserNotFoundError from './services/client/UserNotFound.error';

@Controller('clients')
export default class ClientController {
  public constructor(private service: ClientService) {}

  @Get()
  public async getClients(
    @Query('page') page = 0,
    @Query('offset') offset = 10,
    @Res() res: Response,
  ): Promise<Response> {
    const [qty, data] = await this.service.getClients(
      Number(page),
      Number(offset),
    );
    return res.status(200).jsonp({
      ok: true,
      data,
      qty,
    });
  }

  @Get(':id')
  public async getSingleClient(
    @Param('id') document: string,
    @Res() res: Response,
  ): Promise<Response> {
    let response: NetworkResponse<Client>;
    let statusCode = 200;

    const client = await this.service.getClient(document);
    if (client === null) {
      statusCode = 404;
      response = {
        ok: false,
        msg: `User with document '${document}' not found`,
      };
    } else {
      response = {
        ok: true,
        data: client,
      };
    }

    return res.status(statusCode).jsonp(response);
  }

  @Post()
  public async addClient(
    @Body() body: Client,
    @Res() res: Response,
  ): Promise<Response> {
    let response: NetworkResponse = { ok: false };
    let statusCode = 400;

    if (!body) {
      response.error = `Empty body`;
    }
    if (!body.clientType) {
      response.error = `Client Type must be provided, either as 'fisico' or 'juridico'`;
    }
    if (body.clientType !== 'fisico' && body.clientType !== 'juridico') {
      response.error = `Wrong Client Type`;
    }
    if (!body.document) {
      response.error = `A document must be provided`;
    }
    if (!body.name) {
      response.error = `Client's name must be provided`;
    }
    if (!body.contacts || !body.contacts.mobileNumber) {
      response.error = `At least the mobile phone number must be provided in 'contacts' object.`;
    } else {
      try {
        const data = { ...body };

        data.document = body.document.replace(/[\D]+/g, '');

        if (data.document.length !== 11 && data.clientType === 'fisico') {
          response.error = `Invalid document. Documents for client type 'fisico' must have exactly 11 digits.`;
          return res.status(statusCode).jsonp(response);
        }

        if (data.document.length !== 14 && data.clientType === 'juridico') {
          response.error = `Invalid document. Documents for client type 'juridico' must have exactly 14 digits.`;
          return res.status(statusCode).jsonp(response);
        }
        await this.service.addClient(body);
        response = {
          ok: true,
        };
        statusCode = 201;
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          response = {
            ok: false,
            error: `There is already a client with this document.`,
          };
        } else {
          throw err;
        }
      }
    }

    return res.status(statusCode).jsonp(response);
  }

  @Put(':id')
  @Patch(':id')
  public async editClient(
    @Param('id') document: string,
    @Body() body: Client,
    @Res() res: Response,
  ): Promise<Response> {
    let response: NetworkResponse = { ok: false };
    let statusCode = 400;

    try {
      const data = { ...body };

      data.document = body.document.replace(/[\D]+/g, '');

      if (data.document.length !== 11 && data.document.length !== 13) {
        response.error = `Invalid document`;
        return res.status(statusCode).jsonp(response);
      }

      await this.service.editClient(document, data);

      response = {
        ok: true,
      };
      statusCode = 200;
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        response = {
          ok: false,
          error: `This Client does not exist.`,
        };
        statusCode = 404;
      } else {
        throw err;
      }
    }
    return res.status(statusCode).jsonp(response);
  }

  @Delete(':id')
  public async delete(
    @Param('id') document: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.service.removeClient(document);
      return res.status(200).jsonp({ ok: true });
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res
          .status(404)
          .jsonp({ ok: false, error: `This Client does not exist.` });
      }
      throw err;
    }
  }
}
