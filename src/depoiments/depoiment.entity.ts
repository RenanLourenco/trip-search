import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'depoiments'})
export class DepoimentEntity {
    @PrimaryGeneratedColumn()
    id:string
    
    @Column()
    photo:string
    
    @Column()
    user: string

}
