import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string=uuidv4();

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: number;

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