import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationEntity } from './destination.entity';
import { Repository } from 'typeorm';
import { CreateDestinationDTO } from './DTO/CreateDestination.dto';
import { UpdateDestinationDTO } from './DTO/UpdateDestination.dto';

@Injectable()
export class DestinationService {
    constructor(
        @InjectRepository(DestinationEntity)
        private readonly destinationEntity: Repository<DestinationEntity>
    ){}

    async saveDestination(data: CreateDestinationDTO){
        const destination = new DestinationEntity();

        Object.assign(destination,data)

        return this.destinationEntity.save(destination)
    }

    async getOneDestination(id:string){
        const destination = await this.destinationEntity.findOneBy({id:id})

        return destination
    }

    async listDestinations(){
        const destinations = await this.destinationEntity.find();

        return destinations
    }

    async likeDestinations(search: string){
        const destinations = await this.destinationEntity
        .createQueryBuilder()
        .select()
        .where('MATCH(name) AGAINST (:name IN BOOLEAN MODE)', {name: search})
        .getMany()

        return destinations
    }

    async updateDestination(id: string, newData: UpdateDestinationDTO){
        const destination = await this.destinationEntity.findOneBy({id})

        if(destination === null) {
            throw new NotFoundException('Destination not found!')
        }

        Object.assign(destination,newData);

        return await this.destinationEntity.save(destination)
    }

    async deleteDestination(id:string){
        const destinationDeleted = await this.destinationEntity.delete(id);

        if(!destinationDeleted.affected){
            throw new NotFoundException('Destination not found!')
        }
    }

}
