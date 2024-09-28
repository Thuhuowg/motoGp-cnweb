import { Module } from "@nestjs/common";
import { Rider } from "src/models/rider.entity";
import { RiderController } from "./rider.controller";
import { RiderService } from "./rider.service";
import { RiderRepo } from "src/repositories/rider.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Rider])],
    controllers: [RiderController],
    providers: [RiderService, RiderRepo],
    exports: [RiderRepo]
})
export class RiderModule {};
