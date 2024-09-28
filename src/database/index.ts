import "reflect-metadata";
import { Rider } from "src/models/rider.entity";
import { Team } from "src/models/team.entity";
import { DataSourceOptions, DataSource } from 'typeorm';

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'motogp',
    synchronize: false,
    entities: [Rider, Team],
};

export const DbConfig = new DataSource(options);
export const DbConfigOptions = options;
