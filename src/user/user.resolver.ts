import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { UserInput, UserOutPut } from './dtos/user.dto';
import { UserService } from './user.service';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver()
export class UserReolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async login(@Args('input') input: UserInput, @Context() context): Promise<string> {
    const { accessToken, refreshToken } = await this.userService.getToken(input)

    context.res.setHeader(`Authorization`, `Bearer ${accessToken}`);
    context.res.cookie('x-refresh-token', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    return '로그인에 성공하였습니다.'
  }

  @UseGuards(AuthGuard)
  @Query(() => UserOutPut)
  getProfile(@Request() req) {
    return req.user;
  }
}
