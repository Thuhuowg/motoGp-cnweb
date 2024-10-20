import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { RiderService } from "./rider.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateRiderDto } from "src/dto/CreateRiderDto";
import { UpdateRiderDto } from "src/dto/UpdateRiderDto";
import { RolesGuard } from "../roles/role.guard";
import { AuthGuard } from "../auths/auth.guard";

@Controller('rider')
export class RiderController {
    constructor (
        private readonly riderService: RiderService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getRiders (@Param('search') search?:string){
    try {
      console.log('kkkkk')
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
    // @UseGuards(AuthGuard,new RolesGuard(1))
    @UseGuards(AuthGuard)
    @Get('admin-list')
    async getRidersAdmin (@Param('search') search?:string){
    try {
      console.log('kkkkk')
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
    // @UseGuards(AuthGuard,new RolesGuard(1))
    // @UseGuards(AuthGuard)
    @Get('result')
    async result (){
    try {
      console.log('kkkkk')
         return  await this.riderService.getResultRiders()
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
    // @UseGuards(AuthGuard,new RolesGuard(1))
    // @UseGuards(AuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('rider_image')) // Tên field trong form
    async create(@UploadedFile() file: Express.Multer.File, @Body() createRiderDto: CreateRiderDto) {
        if (file) {
            createRiderDto.rider_image = file.filename; // Lưu tên file vào DTO
        }
        
        try {
            console.log(createRiderDto);
            const rider = await this.riderService.createRider(createRiderDto);
            return { message: "Tạo rider thành công", rider };
        } catch (error) {
            console.error('Error creating rider:', error);
            throw new HttpException('Không thể tạo rider', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard,new RolesGuard(1))
    // @UseGuards(AuthGuard)
    @Get('delete/:rider_code')
    async deleteRider (@Param('rider_code') rider_code:string){
    try {
         return await this.riderService.deleteRider(rider_code)
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
    // @UseGuards(AuthGuard,new RolesGuard(1))
    @UseGuards(AuthGuard)
    @Get('admin/:rider_code')
    async getRiderByCodeAdmin (@Param('rider_code') rider_code:string){
    try {
      console.log(rider_code)
      const data = await this.riderService.getRiderByCodeAdmin(rider_code)
      console.log(data)
         return data
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
    // @UseGuards(AuthGuard,new RolesGuard(1))
    // @UseGuards(AuthGuard)
    @Get('restore/:rider_code')
    async getRiderRestore (@Param('rider_code') rider_code:string){
    try {
         return  await this.riderService.restore(rider_code)
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
    // @UseGuards(AuthGuard,new RolesGuard(1))
    // @UseGuards(AuthGuard)
    @Put('update/:rider_code')
    async update(@Param('rider_code') rider_code:string, @Body() updateRiderDto: UpdateRiderDto) {

        try {
          return await this.riderService.updateRider(rider_code, updateRiderDto)
        } catch (error) {
            console.error('Error creating rider:', error);
            throw new HttpException('Không thể tạo rider', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard,new RolesGuard(1))
    @UseGuards(AuthGuard)
    @Get('trash')
    async getTrash (){
    try {
         return  await this.riderService.getTrash()
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
    @Get('/:rider_code')
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