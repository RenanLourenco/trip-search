import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentsService } from '../src/depoiments/depoiments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from '../src/config/postgres.config.service';
import { DepoimentEntity } from '../src/depoiments/depoiment.entity';
import { ConfigModule } from '@nestjs/config';

describe('DepoimentsService', () => {
  let service: DepoimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forFeature([DepoimentEntity]),
        TypeOrmModule.forRootAsync({
          useClass:PostgresConfigService,
          inject:[PostgresConfigService]
        }),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [DepoimentsService],
    }).compile();

    service = module.get<DepoimentsService>(DepoimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
