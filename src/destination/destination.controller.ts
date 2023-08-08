import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDTO } from './DTO/CreateDestination.dto';
import { UpdateDestinationDTO } from './DTO/UpdateDestination.dto';
import { ListDestinationDTO } from './DTO/ListDestination.dto';

@Controller('destination')
export class DestinationController {

    constructor(private readonly destinationService: DestinationService){}

    @Post()
    async createDestination(@Body() data: CreateDestinationDTO){
        const createdDestination = await this.destinationService.saveDestination(data);

        return {
            destination: createdDestination,
            msg: 'Destination created'
        }
    }

    @Get()
    async listDestinations(){
        const destinations = await this.destinationService.listDestinations();

        return destinations
    }

    @Get('/:id')
    async getOneDestiny(@Param('id') id: string){
        const destination = await this.destinationService.getOneDestination(id);

        return destination
    }

    @Get('/destinations')
    async queryDestinations(
        @Query('nome') nome:string,
    ){
        const destinations = await this.destinationService.likeDestinations(nome);

        return destinations.map( (destination) => new ListDestinationDTO(
            destination.id,
            destination.description,
            destination.meta,
            destination.photo_one,
            destination.photo_two,
            destination.name
        ))
    }

    @Put('/:id')
    async updateDestination(
        @Param('id') id:string,
        @Body() newData: UpdateDestinationDTO
    ){
        const updatedDestination = await this.destinationService.updateDestination(id, newData);

        return {
            destination: updatedDestination,
            msg: 'Destination updated with success.'
        }
    }

    @Delete('/:id')
    async deleteDestination(
        @Param('id') id:string
    ){
        await this.destinationService.deleteDestination(id);

        return {
            msg: 'Destination deleted'
        }
    }

}
