import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Ticket } from 'src/database/ticket.entity';
import { UserTicket } from 'src/database/user-ticket.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [User, Ticket, UserTicket],
        synchronize: true,
      }),
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
