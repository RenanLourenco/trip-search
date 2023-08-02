import { Injectable, NotFoundException } from '@nestjs/common';
import { DepoimentEntity } from './depoiment.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepoimentDTO } from './DTO/CreateDepoiment.dto';
import { UpdateDepoimentDTO } from './DTO/UpdateDepoiment.dto';

@Injectable()
export class DepoimentsService {
    constructor(
        @InjectRepository(DepoimentEntity)
        private readonly depoimentEntity: Repository<DepoimentEntity>
    ){}

    async saveDepoiment(data: CreateDepoimentDTO){
        const depoiment = new DepoimentEntity();
        
        Object.assign(depoiment, data)

        return this.depoimentEntity.save(depoiment);
    }

    async homeDepoimentsPage(){
        const depoiments = await this.depoimentEntity.find();

        if(depoiments.length <= 3 ){
            return depoiments
        }

        const randomDepoiments : DepoimentEntity[] = []

        while(randomDepoiments.length < 3){
            const indexRandom = Math.floor(Math.random() * depoiments.length)
            randomDepoiments.push(depoiments[indexRandom])
        }

        return randomDepoiments
    }

    async listDepoiments(){
        const depoiments = await this.depoimentEntity.find();

        return depoiments
    }

    async updateDepoiment(id: string, newData: UpdateDepoimentDTO){
        const depoiment = await this.depoimentEntity.findOneBy({id})

        if(depoiment === null) {
            throw new NotFoundException('Depoiment not found!')
        }

        Object.assign(depoiment,newData);

        return await this.depoimentEntity.save(depoiment)

    }

    async deleteDepoiment(id:string){
        const depoimentDeleted = await this.depoimentEntity.delete(id);

        if(!depoimentDeleted.affected){
            throw new NotFoundException('Depoiment not found!')
        }
    }

}
