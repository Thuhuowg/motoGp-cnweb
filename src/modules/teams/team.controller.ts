import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "src/dto/CreateTeamDto";

@Controller('team')
export class TeamController {
    constructor (
        private readonly teamService: TeamService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('create')
    async createUser(@Body() createTeamDto: CreateTeamDto){
        try {
             const user=await this.teamService.createTeam(createTeamDto)
            //  await this.kafkaService.sendMessage(
            //     "create user",
            //     createUserDto,
            //     user
            //  )
             return {message:"Tao nguoi dung thanh cong",user}
             
            
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Yeu cau khong tot',
              }, HttpStatus.BAD_REQUEST, {
                cause: error
              });
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getTeam (){

    try {
         return  await this.teamService.getListTeam()
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Khong tim thay team nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }
    @HttpCode(HttpStatus.OK)
    @Get('admin')
    async getTeamAdmin (){

    try {
         return  await this.teamService.getListTeam()
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Khong tim thay team nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    async getTeamById (@Param('id') id:number){
    try {
         return  await this.teamService.getTeamById(id)
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Khong tim thay team nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }
}