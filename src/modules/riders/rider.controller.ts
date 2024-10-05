import { Controller, Get, HttpCode, HttpException, HttpStatus, Param } from "@nestjs/common";
import { RiderService } from "./rider.service";

@Controller('rider')
export class RiderController {
    constructor (
        private readonly riderService: RiderService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getRiders (@Param('search') search?:string){
    try {
         return  await this.riderService.getListRider(search)
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Khong tim thay rider nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }   
    @HttpCode(HttpStatus.OK)
    @Get('rider/:rider_code')
    async getRiderByCode (@Param('rider_code') rider_code:string){
    try {
         return  await this.riderService.getRiderByCode(rider_code)
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Khong tim thay rider nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }  
}