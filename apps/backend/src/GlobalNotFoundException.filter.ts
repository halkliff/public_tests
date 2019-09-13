import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NetworkResponse } from '@cacdigital-lib/types';

@Catch(NotFoundException)
export default class GlobalNotFoundExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const response: NetworkResponse = {
      ok: false,
      msg: `The resource path '${req.path}' doesn't exist.`,
    };

    res.status(404).jsonp(response);
  }
}
