import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dtos/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Resolver()
export class UserResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  async login(
    @Args('input') input: UserInput,
    @Context() context,
  ): Promise<string> {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );

    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    context.res.setHeader(`Authorization`, `Bearer ${accessToken}`);
    context.res.cookie('x-refresh-token', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return '로그인에 성공하였습니다.';
  }
}
