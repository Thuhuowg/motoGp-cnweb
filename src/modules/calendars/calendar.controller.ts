import { Controller, Get, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { CalendarService } from "./calendar.service";

@Controller('calendar')
export class CalendarController {
    constructor(
        private readonly calenService: CalendarService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getTeam (){
    try {
         return  await this.calenService.getListCalen()
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Da xay ra loi. Khong tim thay lich thi dau nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }
}