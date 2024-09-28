import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "src/models/team.entity";
import { TeamController } from "./team.controller";
import { TeamRepo } from "src/repositories/team.repository";
import { TeamService } from "./team.service";

@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    controllers: [TeamController],
    providers: [TeamRepo, TeamService]
    // exports
})
export class TeamModule {};
