import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTeamDto } from "src/dto/CreateTeamDto";
import { Team } from "src/models/team.entity";
import {Repository} from "typeorm"

@Injectable()
export class TeamRepo {
    constructor (
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>
    ) {}

    async createTeam (createTeamDto : CreateTeamDto) :Promise <Team> {
        const team = await this.teamRepository.create(createTeamDto);
        return await this.teamRepository.save(team)
    }
    async getTeam():Promise<Team[] | null> {
        let query = `
        SELECT 
    t.*,
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'id', r.id,
            'first_name', r.first_name,
            'last_name', r.last_name
        )
    ) AS rider_on_team
FROM 
    teams t
LEFT JOIN 
    riders r ON t.id = r.team_id
GROUP BY 
    t.id;
        `
        return await this.teamRepository.query(query);
    }
    async getTeamById(id: number): Promise<Team | null> {
        const query = `
            SELECT 
    t.*, 
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'id', r.id,
            'first_name', r.first_name,
            'last_name', r.last_name
        )
    ) AS rider_on_team
FROM 
    teams t
LEFT JOIN 
    riders r ON t.id = r.team_id
    where team_id = ${id}
GROUP BY 
    t.id;`
        // return await this.teamRepository.findOne({where: {id:id}})
        const result = await this.teamRepository.query(query);
        return result[0]
    }

    
}