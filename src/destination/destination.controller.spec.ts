import { Test, TestingModule } from '@nestjs/testing';
import { DestinationController } from './destination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationEntity } from './destination.entity';
import { PostgresConfigService } from '../config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { DestinationService } from './destination.service';
import { ListDestinationDTO } from './DTO/ListDestination.dto';
import { NotFoundException } from '@nestjs/common';
import { DepoimentEntity } from 'src/depoiments/depoiment.entity';

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
            deleteDestination: jest.fn(),
            likeDestinations: jest.fn()
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

  describe('Create a new Destination', () => {
    it('should return a new destination saved', async () => {
      const expected : DestinationEntity = {
        id:'30',
        photo:'https://via.placeholder.com/150',
        price:1000,
        name:'santos'
      }

      jest.spyOn(service, 'saveDestination').mockImplementation(async () => expected)

      expect(await controller.createDestination({
        photo:'https://via.placeholder.com/150',
        price:1000,
        name:'santos'
      })).toStrictEqual({
        msg:'Destination created',
        destination:expected
      })
    })
  })

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
    it('should return queried destination', async () => {
      const destinations : ListDestinationDTO[] = [{
        id:"30",
        photo:'https://via.placeholder.com/153',
        price:1000,
        name:'santos'
      } ]

      jest.spyOn(service, 'likeDestinations').mockImplementation(async () => destinations)

      expect(await controller.queryDestinations('sant')).toEqual(destinations)

    })
  })

  describe('Try to search a destination who doesnt exist', () => {
    it('should return a empty array', async () => {
      const destinations : ListDestinationDTO[] = []

      jest.spyOn(service, 'likeDestinations').mockImplementation(async () => destinations);

      expect(await controller.queryDestinations('sant')).toEqual(destinations)

    })
  })

  describe('Update a destination', () => {
    it('should return a updated destination', async () => {
      const expected : DestinationEntity = {
        id:'30',
        photo:'https://via.placeholder.com/153',
        price:100,
        name:'santos'
      }

      jest.spyOn(service, 'updateDestination').mockImplementation(async () => expected);


      expect(await controller.updateDestination('30', {
        price:100
      })).toStrictEqual({
        destination: expected,
        msg:'Destination updated with success.'
      })
    })
  })

  describe('Try to update a invalid destination', () => {
    it('should throw a error', () => {
      jest.spyOn(service, 'updateDestination').mockRejectedValue(new NotFoundException('Destination not found!'))

      expect(controller.updateDestination('30',{
        price:300
      })).rejects.toThrowError('Destination not found!')

    })
  })

  describe('Delete a destination', () => {
    it('should delete a destination', async () => {
      const spyOnDelete = jest.spyOn(service, 'deleteDestination');

      const deleteDestination = await controller.deleteDestination('30');

      expect(spyOnDelete).toBeCalledTimes(1);
      expect(deleteDestination).toStrictEqual({
        msg: 'Destination deleted'
      })
    })
  })

  describe('Try to delete a invalid destination', () => {
    it('should throw a error', () => {
      jest.spyOn(service, 'deleteDestination').mockRejectedValue(new NotFoundException('Destination not found'))

      expect(controller.deleteDestination('30')).rejects.toThrowError('Destination not found')
    })
  })

});
