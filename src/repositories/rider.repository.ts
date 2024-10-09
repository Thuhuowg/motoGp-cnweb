import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { query } from "express";
import { CreateRiderDto } from "src/dto/CreateRiderDto";
import { UpdateRiderDto } from "src/dto/UpdateRiderDto";
import { Rider } from "src/models/rider.entity";
import { Repository } from "typeorm";
@Injectable()
export class RiderRepo {
    constructor (
        @InjectRepository(Rider)
        private readonly riderRepository : Repository<Rider>
    ) {}
    async createRider (createRiderDto : CreateRiderDto): Promise<Rider | null> {
        const team = await this.riderRepository.create(createRiderDto);
        return await this.riderRepository.save(team)
    }
    async updateRider(id:string,updateRiderDto: UpdateRiderDto): Promise<Rider> {
        const rider = await this.riderRepository.findOne({where:{id: id}})
        if (rider) {
            Object.assign(rider,updateRiderDto)
            return this.riderRepository.save(rider)
        }
    }
    async getListRider(search?: string): Promise <Rider[]> {
        let query =
        `
        SELECT 
    r.*, 
    ARRAY_AGG(CONCAT(r2.first_name, ' ', r2.last_name)) AS team_members
FROM 
    riders r
LEFT JOIN 
    riders r2 ON r.team_id = r2.team_id AND r.id <> r2.id
GROUP BY 
    r.id;
        `
        let sql
        if(search) {
            query += `WHERE LOWER(first_name) LIKE LOWER($1) OR LOWER(last_name) LIKE LOWER($1) OR UPPER (rider_code) LIKE UPPER($1)`
            const users = await this.riderRepository.query(query, [`%${search}%`]);
        }
        const users = await this.riderRepository.query(query);
    return users;
    }
    async getRiderByCode (rider_code:string) : Promise <Rider> {
        const query = `
        SELECT 
            r1.*,r
        FROM 
            riders r1
        LEFT JOIN 
            riders r2 ON r1.team_id = r2.team_id AND r1.rider_code != r2.rider_code
        LEFT JOIN 
            teams t ON r1.team_id = t.id
        WHERE 
            r1.rider_code = ?;
    `;
    return await this.riderRepository.query(query, [rider_code]);
    }
}