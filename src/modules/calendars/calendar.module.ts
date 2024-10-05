import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Calendar } from "src/models/calendar.entity";
import { CalendarController } from "./calendar.controller";
import { CalendarRepo } from "src/repositories/calendar.repository";
import { CalendarService } from "./calendar.service";


@Module({
    imports: [TypeOrmModule.forFeature([Calendar])],
    controllers: [CalendarController],
    providers: [CalendarRepo, CalendarService]
    // exports
})
export class CalendarModule {};
