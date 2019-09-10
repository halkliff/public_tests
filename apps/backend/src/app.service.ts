import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  protected message = 'Hello World!';

  public getHello(): string {
    return this.message;
  }
}
