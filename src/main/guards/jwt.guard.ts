import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/auth/public-routes.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest<TUser = void>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    if (isPublic && user.id) {
      return user;
    }

    if (info) {
      if (info.name === 'JsonWebTokenError') {
        console.warn('JwtAuthGuard', 'Token invalid');
        throw new UnauthorizedException('Token invalid');
      }
      if (info.name === 'TokenExpiredError') {
        console.warn('JwtAuthGuard', 'Token expired');
        throw new UnauthorizedException('Token expired');
      }
      if (info.message === 'No auth token') {
        console.warn('JwtAuthGuard', 'No auth token');
        throw new UnauthorizedException('No auth token');
      }
      throw new UnauthorizedException(info.message);
    } else if (err) {
      throw new UnauthorizedException(err.message);
    }
    return user;
  }
}
