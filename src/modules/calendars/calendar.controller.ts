import { Controller, Get, HttpCode, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { AuthGuard } from "../auths/auth.guard";
@Controller('calendar')
export class CalendarController {
    constructor(
        private readonly calenService: CalendarService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getTeam (){
    try {
      console.log(Headers)
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