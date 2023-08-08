import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'destinations'})
export class DestinationEntity {
    @PrimaryGeneratedColumn()
    id:string
    
    @Column()
    photo_one:string

    @Column()
    photo_two:string
    
    @Column()
    name:string

    @Column()
    meta:string

    @Column()
    description:string


}
