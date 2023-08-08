import { Module } from '@nestjs/common';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { DestinationEntity } from './destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([DestinationEntity])],
  controllers: [DestinationController],
  providers: [DestinationService]
})
export class DestinationModule {}
