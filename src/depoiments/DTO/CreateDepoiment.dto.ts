import { IsNotEmpty } from "class-validator";

export class CreateDepoimentDTO {

    @IsNotEmpty({message: 'A Depoiment needs a photo!'})
    photo:string

    @IsNotEmpty({message:'A Depoiment needs a user'})
    user:string

}