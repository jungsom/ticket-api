// 성공 => jwt 발급

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './dtos/user.dto';
import { NotFoundError } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // TODO: 회원가입 (비밀번호 해시화)

  async getToken(input: UserInput): Promise<{accessToken: string, refreshToken: string}> {
    const payload: any = {input};
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h'})
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d'})


    return { accessToken, refreshToken }
  }

  async createAccessToken() {

  }

  async createRefreshToken() {

  }

  async createCookie() {

  }
}
