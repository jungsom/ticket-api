import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { UserTicket } from './user/user-ticket.entity';
import { TicketResolver } from 'src/ticket/ticket.resolver';
import { TicketService } from 'src/ticket/ticket.service';

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
    TypeOrmModule.forFeature([Ticket]),
  ],
  providers: [TicketService, TicketResolver],
})
export class AppModule {}
