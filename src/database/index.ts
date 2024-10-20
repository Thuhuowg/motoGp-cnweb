import "reflect-metadata";
import { Calendar } from "src/models/calendar.entity";
import { Champion } from "src/models/champion.entity";
import { Race } from "src/models/race.entity";
import { Result } from "src/models/result.entity";
import { Rider } from "src/models/rider.entity";
import { Team } from "src/models/team.entity";
import { User } from "src/models/user.entity";
import { DataSourceOptions, DataSource } from 'typeorm';

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'motogp',
    synchronize: false,
    entities: [Rider, Team, Race, Champion, Result, Calendar,User],
};

export const DbConfig = new DataSource(options);
export const DbConfigOptions = options;
