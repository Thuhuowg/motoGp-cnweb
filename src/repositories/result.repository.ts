import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTeamDto } from "src/dto/CreateTeamDto";
import { Result } from "src/models/result.entity";
import {Repository} from "typeorm"

@Injectable()
export class ResultRepo {
    constructor (
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>
    ) {}

    async getResult(race_id: string) : Promise <Result |null> {
        const query =
        `
     SELECT rt.*, 
       rc.race_name, 
       rd.first_name, 
       rd.last_name, 
       rd.nationality, 
       rd.rider_image, 
       t.id AS team_id,  -- Lấy team_id nếu cần
       t.team_name       -- Lấy team_name
FROM results rt
LEFT JOIN races rc ON rc.id = rt.race_id
LEFT JOIN riders rd ON rd.rider_code = rt.rider_code
LEFT JOIN teams t ON t.id = rd.team_id  -- Tham gia bảng teams qua team_id trong riders
WHERE rt.race_id = ${race_id}
ORDER BY rt.score_race_current DESC;

        `
        const data_result = await this.resultRepository.query(query)
        // console.log(data_result)
        return data_result
    }
    
    async getListResult (): Promise <Result[] | null> {
        const query =
        `
        SELECT rt.*, 
       rc.race_name,
       rc.id
FROM results rt
LEFT JOIN races rc ON rc.id = rt.race_id
ORDER BY rt.score_race_current DESC;
        `
        const data = this.resultRepository.query(query);
        return data || []
    }

}