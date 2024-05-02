import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log(context)
    const req = context.switchToHttp().getRequest()
    console.log(req)
    // 如果return true，则request通过此guard；
    // 如果return false，则request被此guard拦截；
    return false;
  }
}
