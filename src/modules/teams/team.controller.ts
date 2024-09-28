import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
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
}