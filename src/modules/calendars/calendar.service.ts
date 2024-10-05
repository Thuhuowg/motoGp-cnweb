import { Injectable } from "@nestjs/common";
import { CalendarRepo } from "src/repositories/calendar.repository";

@Injectable()
export class CalendarService {
    constructor(
        private readonly CalenRepo: CalendarRepo
    ) {}
    async getListCalen() {
        try {
            return await this.CalenRepo.getListCalendar()
        } catch (error) {
            return 'da xay ra loi'
        }
    }
}