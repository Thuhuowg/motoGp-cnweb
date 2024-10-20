import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Result } from "src/models/result.entity";
import { ResultController } from "./result.controller";
import { ResultService } from "./result.service";
import { ResultRepo } from "src/repositories/result.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Result])],
    controllers: [ResultController],
    providers: [ResultService,ResultRepo],
    exports: [ResultRepo]
})
export class ResultModule {};