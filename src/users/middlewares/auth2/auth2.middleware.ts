import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Auth2Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
