import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UserInput, UserOutPut } from './dtos/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Logger } from '@nestjs/common';
import { uuid } from 'src/common/uuid';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Query(() => UserOutPut)
  async signup(@Args('input') input: UserInput, @Context() context) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${UserResolver.name} signup `,
      });

      await this.userService.validateSignupUser(input);
      return await this.userService.createUser(input);
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${UserResolver.name} signup `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${UserResolver.name} signup `,
      });
    }
  }

  @Query(() => UserOutPut)
  async login(@Args('input') input: UserInput, @Context() context) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${UserResolver.name} login `,
      });

      const user = await this.userService.validateLoginUser(input);

      const accessToken = await this.authService.createAccessToken(user);
      const refreshToken = await this.authService.createRefreshToken(user);

      context.res.setHeader(`Authorization`, `Bearer ${accessToken}`);
      context.res.cookie('x-refresh-token', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return user;
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${UserResolver.name} login `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${UserResolver.name} login `,
      });
    }
  }
}
