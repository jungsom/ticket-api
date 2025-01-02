import { Module } from '@nestjs/common';
import { AppController } from '../resolvers/app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from '../services/app.service';
import { ApolloConfig } from '@apollo/server';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Ticket } from '../entities/Ticket.entity';
import { UserTicket } from '../entities/UserTicket.entity';
import { TicketResolver } from 'src/resolvers/ticket.resolver';
import { TicketService } from 'src/services/ticket.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
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
    TypeOrmModule.forFeature([Ticket])
  ],
  controllers: [AppController],
  providers: [AppService, TicketService, TicketResolver],
})
export class AppModule {}
