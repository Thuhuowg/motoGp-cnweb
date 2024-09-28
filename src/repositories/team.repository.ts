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
        return await this.teamRepository.find();
    }
    async getTeamById(id: number): Promise<Team | null> {
        return await this.teamRepository.findOne({where: {id:id}})
    }

}