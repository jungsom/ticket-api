import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;
    const response = GqlExecutionContext.create(context).getContext().res;
    const accessToken = this.extractAccessTokenFromHeader(request);
    const refreshToken = this.extractRefreshTokenFromCookie(request);

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException('잘못된 접근입니다. 다시 시도해 주세요.');
    }
    try {
      if (accessToken) {
        const payload = await this.jwtService.verifyAsync(accessToken, {
          secret: process.env.SECRET_KEY,
        });
        request['user'] = payload;

        return true;
      }
    } catch (error) {
      // 액세스 토큰 만료 시
      if (error.name === 'TokenExpiredError' && refreshToken) {
        const newPayload = await this.jwtService.verifyAsync(refreshToken, {
          secret: process.env.SECRET_KEY,
        })
        const newAccessToken = await this.authService.createAccessToken(newPayload);
        response.setHeader(`Authorization`, `Bearer ${newAccessToken}`);
      // 리프레시 토큰 만료 시
      } else if (!refreshToken) {
        throw new UnauthorizedException("토큰이 만료되었습니다. 다시 로그인해 주세요.");
      }
    }
  }

  /** 헤더에서 액세스 토큰 추출 */
  private extractAccessTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /** 쿠키에서 리프레시 토큰 추출 */
  private extractRefreshTokenFromCookie(request: Request): string | undefined {
    const refreshToken = request.cookies['x-refresh-token'];
    return refreshToken;
  }
}
