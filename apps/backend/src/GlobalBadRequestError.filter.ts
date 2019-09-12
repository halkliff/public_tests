import {
  ExceptionFilter,
  Catch,
  InternalServerErrorException,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import GenericResponse from './generic-response.interface';

@Catch(InternalServerErrorException)
export default class GlobalBadRequestErrorFilter implements ExceptionFilter {
  // eslint-disable-next-line class-methods-use-this
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const response: GenericResponse = {
      ok: false,
      msg: exception.message,
      error: exception.name,
    };

    res.status(400).jsonp(response);
  }
}
