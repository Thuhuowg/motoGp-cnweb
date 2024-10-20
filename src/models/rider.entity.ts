import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuidv4 } from 'uuid';
@Entity({name: 'riders'})
export class Rider{
    @PrimaryGeneratedColumn('uuid')
    id: string=uuidv4();

    @Column()
    rider_code:string;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    nationality:string;

    @Column()
    date_of_birth: Date;

    @Column()
    championship: number;

    @Column()
    rider_image:string;

    @Column({
        type: 'int',
        default: 0
    })
    active:number

    @Column()
    heigth: number;

    @Column()
    weight: string;

    @Column()
    rider_story: string;
    @CreateDateColumn({
        type: 'timestamp',
        default: new Date()
      })
      created_at:Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
        default: new Date(),
      })
      updated_at:Date;
    
    @Column()
    deleted_at:Date
}