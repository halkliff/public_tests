import {
  ExceptionFilter,
  Catch,
  InternalServerErrorException,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { NetworkResponse } from '@cacdigital-lib/types';

@Catch(InternalServerErrorException)
export default class GlobalBadRequestErrorFilter implements ExceptionFilter {
  // eslint-disable-next-line
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const response: NetworkResponse = {
      ok: false,
      msg: exception.message,
      error: exception.name,
    };

    res.status(400).jsonp(response);
  }
}
