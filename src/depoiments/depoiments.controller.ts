import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepoimentsService } from './depoiments.service';
import { CreateDepoimentDTO } from './DTO/CreateDepoiment.dto';
import { UpdateDepoimentDTO } from './DTO/UpdateDepoiment.dto';
import { ListHomeDepoimentsDTO } from './DTO/ListHomeDepoiments.dto';

@Controller('depoiments')
export class DepoimentsController {

    constructor(private readonly depoimentsService: DepoimentsService){}

    @Post()
    async createDepoiment(@Body() data: CreateDepoimentDTO){
        const createdDepoiment = await this.depoimentsService.saveDepoiment(data);

        return{
            depoiment: createdDepoiment,
            msg: 'Depoiment created.'
        }

    }

    @Get()
    async listDepoiments(){
        const depoiments = await this.depoimentsService.listDepoiments();

        return depoiments
    }

    @Get('/home')
    async homeDepoiments(){
        const depoiments = await this.depoimentsService.homeDepoimentsPage();

        return depoiments.map((depoiment) => new ListHomeDepoimentsDTO(depoiment.photo,depoiment.user))
    }


    @Put('/:id')
    async updateDepoiment(
        @Param('id') id:string,
        @Body() newDate: UpdateDepoimentDTO,
    ){
        const updatedDepoiment = await this.depoimentsService.updateDepoiment(id, newDate);
        
        return {
            depoiment: updatedDepoiment,
            msg: 'Depoiment updated with success.'
        }

    }

    @Delete('/:id')
    async deleteDepoiment(
        @Param('id') id: string
    ){
        await this.depoimentsService.deleteDepoiment(id);

        return {
            msg: 'Depoiment deleted'
        }
    }

}
