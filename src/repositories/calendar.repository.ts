import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Calendar } from "src/models/calendar.entity";
import { Repository } from "typeorm";
@Injectable()
export class CalendarRepo {
    constructor(
        @InjectRepository(Calendar)
        private readonly CalendarRepository : Repository<Calendar>
    ){}
    async getListCalendar () {
        const query = `
        select c.*, r.race_name , r.race_location from calendars c 
        left join races r on c.race_id =r.id 
        `
        return await this.CalendarRepository.query(query);
    }
   
}