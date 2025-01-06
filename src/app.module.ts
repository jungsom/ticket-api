import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { UserTicket } from './user/user-ticket.entity';
import { TicketResolver } from 'src/ticket/ticket.resolver';
import { TicketService } from 'src/ticket/ticket.service';
import { UserService } from './user/user.service';
import { UserReolver } from './user/user.resolver';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0414',
      database: 'jervis',
      entities: [User, Ticket, UserTicket],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Ticket, User, UserTicket]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    TicketService,
    TicketResolver,
    UserService,
    UserReolver,
    AuthService,
  ],
})
export class AppModule {}
