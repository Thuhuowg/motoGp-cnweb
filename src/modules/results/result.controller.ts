import { Controller, Get, HttpCode, HttpException, HttpStatus, Param } from "@nestjs/common";
import { ResultService } from "./result.service";

@Controller('result')
export class ResultController {
    constructor (
        private readonly resultService:ResultService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('/:race_id')
    async getResult(@Param('race_id') race_id: string) {
        try {
            const data = await this.resultService.getResultByRace(race_id);
            
            for (const item of data) { // Sử dụng for...of để lặp qua các đối tượng
                if (item.different === '0.0') {
                    item.different = `${item.duration.minutes}:${item.duration.seconds}.${item.duration.milliseconds}`;
                } else {
                    const newStr = item.different.replace('-', '+');
                    item.different = newStr;
                }
            }
    
            return data; // Trả về dữ liệu sau khi đã xử lý
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Đã xảy ra lỗi. Không tìm thấy lịch thi đấu nào',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getListResult () {
        try {
            const data = await this.resultService.getListRace()
            return data || 'khong tim thay'
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Đã xảy ra lỗi. Không tìm thấy lịch thi đấu nào',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }
}