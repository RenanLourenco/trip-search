import { Test, TestingModule } from '@nestjs/testing';
import { DestinationService } from './destination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationEntity } from './destination.entity';
import { PostgresConfigService } from '../config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { DestinationController } from './destination.controller';

describe('DestinationService', () => {
  let service: DestinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([DestinationEntity]),
        TypeOrmModule.forRootAsync({
          useClass: PostgresConfigService,
          inject:[PostgresConfigService]
        }),
        ConfigModule.forRoot({
          isGlobal:true
        })
      ],
      controllers: [DestinationController],
      providers: [
        {
          provide:DestinationService,
          useValue:{
            saveDestination: jest.fn(),
            listDestinations: jest.fn(),
            updateDestination: jest.fn(),
            deleteDestination: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<DestinationService>(DestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
