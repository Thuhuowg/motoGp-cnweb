import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('champions')
export class Champion{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    rider_id:string= uuidv4();

    @Column()
    season:number;

    @Column()
    point:number;

}