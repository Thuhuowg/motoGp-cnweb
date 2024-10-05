import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
@Entity('calendar')
export class Calendar {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    race_id: number;

    @Column()
    date_start: number;

    @Column()
    date_end: number;

    @Column()
    month: string;

    @Column()
    country: string;

    @Column()
    active:number;

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
    
}