import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import GenericResponse from './generic-response.interface';

@Catch(NotFoundException)
export default class GlobalNotFoundExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line class-methods-use-this
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const response: GenericResponse = {
      ok: false,
      msg: `The resource path '${req.path}' doesn't exist.`,
    };

    res.status(404).jsonp(response);
  }
}
