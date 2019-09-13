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
export default class GlobalServerInternalErrorFilter
  implements ExceptionFilter {
  // eslint-disable-next-line
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const response: NetworkResponse = {
      ok: false,
      msg: `An unexpected error occurred. Please, try again later.`,
      error: exception.message,
      stackTrace: exception.stack,
    };

    res.status(500).jsonp(response);
  }
}
