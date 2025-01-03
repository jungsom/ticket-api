import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signIn(
        email: string,
        pass: string
    ): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { email:email } });
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, user_email: user.email}
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

}