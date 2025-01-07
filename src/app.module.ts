import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Ticket } from 'src/database/ticket.entity';
import { UserTicket } from './database/user-ticket.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TicketModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
