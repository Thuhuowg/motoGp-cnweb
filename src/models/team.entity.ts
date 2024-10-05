import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'teams'})
export class Team{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team_name:string;

    @Column()
    motobike:string;

    @Column()
    moto_brand:string;

    @Column()
    moto_image:string;

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