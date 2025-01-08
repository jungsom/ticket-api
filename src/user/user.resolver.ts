import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dtos/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Logger } from '@nestjs/common';
import { uuid } from 'src/common/uuid';

@Resolver()
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Query(() => String)
  async login(
    @Args('input') input: UserInput,
    @Context() context,
  ): Promise<string> {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${UserResolver.name} login `,
      });

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
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${UserResolver.name} login `,
        error: e,
      });
      // TODO: 에러 메시지
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${UserResolver.name} login `,
      });
    }
  }
}
