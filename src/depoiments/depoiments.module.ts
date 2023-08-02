import { Module } from '@nestjs/common';
import { DepoimentsController } from './depoiments.controller';
import { DepoimentsService } from './depoiments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepoimentEntity } from './depoiment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DepoimentEntity])],
  controllers: [DepoimentsController],
  providers: [DepoimentsService]
})
export class DepoimentsModule {}
