import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { Repository } from 'typeorm';
import { PayLoad } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /** 사용자 로그인 정보 확인 */
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.password !== pass) {
      throw new HttpException('로그인 인증에 실패하였습니다.', HttpStatus.UNAUTHORIZED)
    }

    return user;
  }

  /** 액세스 토큰 생성 */
  async createAccessToken(user: User): Promise<string> {
    const payload: PayLoad = { sub: user.id, user_email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return accessToken;
  }

  /** 리프레시 토큰 생성 */
  async createRefreshToken(user: User): Promise<string> {
    const payload: PayLoad = { sub: user.id, user_email: user.email };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return refreshToken;
  }
}
