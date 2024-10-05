import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
@Entity('race')
export class Race {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    race_name: string;

    @Column()
    race_location: string;

    @Column()
    info_bonus: string;

    @Column()
    member_in_race: number;

    @Column()
    round_number: number;

    @Column()
    race_code: string;

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