// 성공 => jwt 발급

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './dtos/user.dto';
import { NotFoundError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  // TODO: 회원가입 (비밀번호 해시화)

  async getLogin(input: UserInput): Promise<{access_token: string}> {
    const { access_token } = await this.authService.signIn(input.email, input.password)

    return { access_token }
  }

  async createAccessToken() {

  }

  async createRefreshToken() {

  }

  async createCookie() {

  }
}
