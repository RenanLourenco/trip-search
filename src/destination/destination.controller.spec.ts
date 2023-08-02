import { Test, TestingModule } from '@nestjs/testing';
import { DestinationController } from './destination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationEntity } from './destination.entity';
import { PostgresConfigService } from '../config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { DestinationService } from './destination.service';

describe('DestinationController', () => {
  let controller: DestinationController;
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
    controller = module.get<DestinationController>(DestinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get All Destinations', () => {
    it('should return all destinations', async () => {
      const expected : DestinationEntity[] = [
        {
          id:'1',
          photo:'https://via.placeholder.com/150',
          price:830,
          name:'paris'
        },
        {
          id:'2',
          photo:'https://via.placeholder.com/15123',
          price:1000,
          name:'japao'
        },
        {
          id:'3',
          photo:'https://via.placeholder.com/153',
          price:799,
          name:'pindamonhagaba'
        }
      ]
  
      jest.spyOn(service, 'listDestinations').mockImplementation(async () => expected)

  
      expect(await controller.listDestinations()).toBe(expected)
    })  
  })
  describe('Search query destination', () => {
    // it('should return queried destination', async () => {
    //   const new 
    // })
  })

});
