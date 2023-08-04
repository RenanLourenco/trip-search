import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentsController } from '../src/depoiments/depoiments.controller';
import { DepoimentsService } from '../src/depoiments/depoiments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepoimentEntity } from '../src/depoiments/depoiment.entity';

import { PostgresConfigService } from '../src/config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { ListHomeDepoimentsDTO } from '../src/depoiments/DTO/ListHomeDepoiments.dto';




describe('DepoimentsController', () => {
  let depoimentsController: DepoimentsController;
  let depoimentsService: DepoimentsService;



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
      controllers: [DepoimentsController],
      providers:[
        {
          provide:DepoimentsService,
          useValue:{
            saveDepoiment: jest.fn(),
            listDepoiments: jest.fn(),
            updateDepoiment: jest.fn(),
            deleteDepoiment: jest.fn(),
            homeDepoimentsPage: jest.fn()
          }
        }
      ]
    }).compile()

    depoimentsService = module.get<DepoimentsService>(DepoimentsService);
    depoimentsController = module.get<DepoimentsController>(DepoimentsController);
  });

  it('should be defined', () => {
    expect(depoimentsController).toBeDefined();
  });

  describe('Get all Depoiments', () => {
    it('should return all depoiments', async () => {

      const expected : DepoimentEntity[] = [
        {
          id:'1',
          photo:'https://via.placeholder.com/150',
          user:'Renan'
        }
      ];

      jest.spyOn(depoimentsService, 'listDepoiments').mockImplementation(async () => expected);

      expect(await depoimentsController.listDepoiments()).toBe(expected)

    })
  })

  describe('Get depoiment home page', () => {
    it('should return 3 random depoiments', async () => {

      const expected : DepoimentEntity[] = [
        {
          id:'8',
          photo:'https://via.placeholder.com/150',
          user:'test1236'
        },
        {
          id:'5',
          photo:'https://via.placeholder.com/120',
          user:'test1235'
        },
        {
          id:'2',
          photo:'https://via.placeholder.com/113',
          user:'test1234'
        }
      ];

      jest.spyOn(depoimentsService, 'homeDepoimentsPage').mockImplementation(async () => expected);

      const result = expected.map((depoiment) => new ListHomeDepoimentsDTO(depoiment.photo, depoiment.user))

      expect(await depoimentsController.homeDepoiments()).toStrictEqual(result)

    })
  })

  describe('Create a new Depoiment', () => {
    it('should return a new depoiment saved', async () => {
      const expected : DepoimentEntity = {
        id:'1',
        photo:'https://via.placeholder.com/150',
        user:'Renan'
      }
  
      jest.spyOn(depoimentsService, 'saveDepoiment').mockImplementation(async () => expected);
  
      expect(await depoimentsController.createDepoiment({
        photo:'https://via.placeholder.com/150',
        user:'Renan'
      })).toStrictEqual({
        msg:'Depoiment created.',
        depoiment:expected
      })  
    })
  })

  describe('Update a depoiment', () => {
    it('should a update a existent depoiment', async () => {
      const expected : DepoimentEntity = {
        id:'1',
        photo:'https://via.placeholder.com/150',
        user:'Updated'
      }

      jest.spyOn(depoimentsService, 'updateDepoiment').mockImplementation(async () => expected);

      expect(await depoimentsController.updateDepoiment('1',{
        user: 'Updated'
      })).toStrictEqual({
        depoiment: expected,
        msg: 'Depoiment updated with success.'
      })

    })
  })

  describe('Delete depoiment', () => {
    it('should delete a depoiment', async () => {

      const spyOnDelete = jest.spyOn(depoimentsService,'deleteDepoiment')

      const deleteDepoiment = await depoimentsController.deleteDepoiment('1');

      expect(spyOnDelete).toBeCalledTimes(1);
      expect(deleteDepoiment).toStrictEqual({
        msg: 'Depoiment deleted'
      })

    })
  })
});
