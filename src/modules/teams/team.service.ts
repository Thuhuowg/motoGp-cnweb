import { Injectable } from "@nestjs/common";
import { CreateTeamDto } from "src/dto/CreateTeamDto";
import { TeamRepo } from "src/repositories/team.repository";

@Injectable()
export class TeamService {
    constructor (
        private readonly teamRepo : TeamRepo
    ) {}
    async createTeam(createTeamDto : CreateTeamDto){
        try {
            return await this.teamRepo.createTeam(createTeamDto)
        } catch (error) {
            console.log(error)
        }
    }
}