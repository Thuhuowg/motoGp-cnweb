import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { query } from "express";
import { CreateRiderDto } from "src/dto/CreateRiderDto";
import { UpdateRiderDto } from "src/dto/UpdateRiderDto";
import { Rider } from "src/models/rider.entity";
import { Repository } from "typeorm";
@Injectable()
export class RiderRepo {
    constructor(
        @InjectRepository(Rider)
        private readonly riderRepository: Repository<Rider>
    ) { }
    async createRider(createRiderDto: CreateRiderDto): Promise<Rider | null> {
        const team = await this.riderRepository.create(createRiderDto);
        return await this.riderRepository.save(team)
    }
    async updateRider(rider_code: string, updateRiderDto: UpdateRiderDto): Promise<Rider> {
        const rider = await this.riderRepository.findOne({ where: { rider_code: rider_code } })
        if (rider) {
            Object.assign(rider, updateRiderDto)
            return this.riderRepository.save(rider)
        }
    }
    async softDelete(code: string): Promise<void> {
        console.log(code)
        const rider = await this.riderRepository.findOne({ where: { rider_code: code } });
    
        rider.deleted_at = new Date(); 
        console.log(rider.deleted_at)
        // Cập nhật trường deleted_at
        await this.riderRepository.save(rider);
      }
    async getListRider(search?: string): Promise<Rider[]> {
        let query =
            `
        SELECT 
    r.*, t.team_name as team,
    ARRAY_AGG(CONCAT(r2.first_name, ' ', r2.last_name)) AS team_members
FROM 
    riders r
    LEFT JOIN teams t ON t.id = r.team_id
LEFT JOIN 
    riders r2 ON r.team_id = r2.team_id AND r.id <> r2.id
WHERE 
        r.deleted_at IS NULL
         group by r.id, t.team_name ;
        `
        let sql
        if (search) {
            query += `WHERE LOWER(first_name) LIKE LOWER($1) OR LOWER(last_name) LIKE LOWER($1) OR UPPER (rider_code) LIKE UPPER($1)`
            const users = await this.riderRepository.query(query, [`%${search}%`]);
        }
        const users = await this.riderRepository.query(query);
        return users;
    }
    async getRiderByCode(rider_code: string): Promise<Rider> {
        const param = [rider_code]
        const query = `
       

SELECT 
    r1.rider_code,r1.id, r1.nationality, r1.first_name, r1.last_name, r1.rider_image,  r1.rider_story, r1.date_of_birth ,r1.championship,
    SUM(res.score_race_current) AS total_score,
    r2.first_name AS teammate_first_name, 
    r2.last_name AS teammate_last_name,
    t.team_name , t.motobike , t.moto_brand , t.moto_image , t.id,
    COUNT(res.first_finish) AS first_finish_count,
    r1.heigth, r1.weight
FROM 
    riders r1
JOIN 
    results res ON r1.rider_code = res.rider_code
LEFT JOIN 
    riders r2 ON r1.team_id = r2.team_id AND r1.rider_code != r2.rider_code
LEFT JOIN 
    teams t ON r1.team_id = t.id
WHERE 
    r1.rider_code = '${rider_code}'
GROUP BY 
   r1.rider_code,r1.id, r1.nationality, r1.first_name, r1.last_name, r1.rider_image, r1.rider_story,r1.date_of_birth ,r1.championship,
  t.team_name , t.motobike , t.moto_brand , t.moto_image , t.id, teammate_first_name,
 teammate_last_name ;
    `;
       
        const result = await this.riderRepository.query(query)
        return result[0];
    }

    async getResultRiders(): Promise<Rider[] | null> {
        const query =
            `
       SELECT r.rider_code, r.first_name ,r.last_name ,r.nationality,t.team_name ,r.rider_image , SUM(res.score_race_current) AS total_score
FROM riders r
JOIN results res ON r.rider_code = res.rider_code
left join teams t on t.id = r.team_id 
GROUP BY r.rider_code, r.first_name ,r.last_name ,r.nationality,t.team_name,r.rider_image 
order by total_score desc ;
        `
        const result = await this.riderRepository.query(query)
        console.log(result)
        return result
    }

    async getRiderByCodeAdmin(rider_code: string): Promise<Rider> {
        const param = [rider_code]
        const query = `
       

SELECT 
    r1.rider_code,r1.id, r1.nationality, r1.first_name, r1.last_name, r1.rider_image, 
    r1.heigth, r1.weight
FROM 
    riders r1
WHERE 
    r1.rider_code = '${rider_code}'
GROUP BY 
   r1.rider_code,r1.id, r1.nationality, r1.first_name, r1.last_name;
    `;
       
        const result = await this.riderRepository.query(query)
        return result[0];
    }
    async getTrash (): Promise<Rider[]>|null {
        const query= `
         select * from riders r
        where r.deleted_at is not null;
        `
        return await this.riderRepository.query(query)
    }
    async restore (rider_code: string): Promise <Rider>|null {
        console.log('kkkkkkkkkk')
        const sql =`
        update riders
        set deleted_at = null
        where rider_code = '${rider_code}'
        `
        return await this.riderRepository.query(sql)
    }
}