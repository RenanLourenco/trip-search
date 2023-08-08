import { IsInt, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateDestinationDTO {

    @IsNotEmpty({message: 'A Destination needs a photo!'})
    photo_one:string

    @IsNotEmpty({message: 'A Destination needs a photo!'})
    photo_two:string

    @IsNotEmpty({message:'A Destination needs to hava a name'})
    @MaxLength(100, {
        message: 'Name cannot have more than 100 characters',
    })
    name:string;

    @IsNotEmpty({message:'A Destination needs to hava a meta descriptive'})
    @MaxLength(160, {
        message: 'Meta cannot have more than 100 characters',
    })
    meta:string;

    
    @IsOptional()
    description:string



}