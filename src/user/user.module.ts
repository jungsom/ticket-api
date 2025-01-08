import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { UserTicket } from '../database/user-ticket.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTicket]), AuthModule],
  providers: [UserResolver, UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
