import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = GqlExecutionContext.create(context).getContext();
        const accessToken = this.extractAccessTokenFromHeader(request);
        if (!accessToken) {
            throw new UnauthorizedException();
        } 
        try {
            const payload = await this.jwtService.verifyAsync(
                accessToken,
                {
                    secret: process.env.SECRET_KEY
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractAccessTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractRefreshTokenFromCookie(request: Request): string | undefined {
        const refreshToken = request.cookies['x-refresh-token']
        return refreshToken;
    }

    // TODO: 재발급
}