import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepoimentsModule } from './depoiments/depoiments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { DestinationModule } from './destination/destination.module';
import { Gpt } from './gpt/gpt';
import { Openai } from './openai/openai';


@Module({
  imports: [
    DepoimentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass:PostgresConfigService,
      inject:[PostgresConfigService]
    }),
    DestinationModule
  ],
  controllers: [AppController],
  providers: [AppService, Gpt, Openai],
})
export class AppModule {}
