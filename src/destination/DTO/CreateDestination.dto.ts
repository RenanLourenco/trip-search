import { IsInt, IsNotEmpty, MaxLength } from "class-validator";

export class CreateDestinationDTO {

    @IsNotEmpty({message: 'A Destination needs a photo!'})
    photo:string

    @IsInt({message:'Wrong type for price field'})
    @IsNotEmpty({message:'A Destination needs a price'})
    price:number

    @IsNotEmpty({message:'A Destination needs to hava a name'})
    @MaxLength(100, {
        message: 'Name cannot have more than 100 characters',
    })
    name:string;

}