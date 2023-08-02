import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'destinations'})
export class DestinationEntity {
    @PrimaryGeneratedColumn()
    id:string
    
    @Column()
    photo:string
    
    @Column()
    price: number

    @Column()
    name:string

}
