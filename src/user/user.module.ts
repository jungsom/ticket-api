import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserTicket } from './user-ticket.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserTicket]),
    AuthModule
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
