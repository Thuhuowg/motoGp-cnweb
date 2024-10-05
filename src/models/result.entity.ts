import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from 'typeorm'
import { v4 as uuidv4 } from 'uuid';
@Entity('result')
export class Result {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    rider_id: string = uuidv4();

    @Column()
    race_id: number;

    @Column()
    score_race_current: number;
    
    @Column({ type: 'interval' })
    time: string;

    @Column({
        type: 'boolean',
        default: false
    })
    first_finish: boolean;

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