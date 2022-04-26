import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/events.entity';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      username: 'root',
      password: 'example',
      database: 'events-full-test',
      authSource: 'admin',
      entities: [Event],
      synchronize: true,
      logging: ['query', 'error'],
    }),
    EventsModule,
  ],
})
export class AppModule {}
