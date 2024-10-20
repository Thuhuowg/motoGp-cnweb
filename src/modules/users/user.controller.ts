import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auths/auth.guard";
import { CreateUserDto } from "src/dto/CreateUserDto";
// import { UpdateUserDto } from "src/dto/UpdateUserDto";
// import { AuthGuard } from "../auths/auth.guard";
// import { RolesGuard } from "../roles/role.guard";
// import { request } from "http";
// import { GetUser } from "src/decorators/get-user.decorate";
// import { KafkaService } from "../kafka/kafka.service";


@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService,
        // private readonly kafkaService : KafkaService,
        ){}
        @UseGuards(AuthGuard)
        @Get('profile')
        getProfile(@Request() req) {
            // Giả sử thông tin người dùng đã được giải mã và lưu trong req.user
            return req.user; // Trả về thông tin người dùng
        }
        
    @HttpCode(HttpStatus.OK)
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto){
      createUserDto['userService'] = this.userService;
        try {
          
             const user=await this.userService.createUser(createUserDto)
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

    // @UseGuards(AuthGuard,new RolesGuard(1),)
   
    @Get('list')

    async findAllUser(){
       try {
        
         return  await this.userService.getAllUser()
       } catch (error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Khong tim thay nguoi dung nao',
          }, HttpStatus.NOT_FOUND, {
            cause: error
          });
       }
    }
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard)
    // @Get(':id')
    // async findUserById(@Param('id') id:string,@GetUser() user){
    //     try {
    //         if(id===user.sub || user.role===1){
    //             console.log("ok")
    //             return this.userService.getUsesrById(id)
                
    //         }
    //         throw new NotFoundException('ban khong co quyen truy cap')
    //     } catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.NOT_FOUND,
    //             error: `khong tim thay nguoi dung co id ${id}`,
    //           }, HttpStatus.NOT_FOUND, {
    //             cause: error
    //           });
    //     }
    // }
    // @HttpCode(HttpStatus.OK)
    // @Patch('update/:id')
    // async updateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
    //     console.log(updateUserDto)
    //     try {
    //         const user=await this.userService.updateUser(id,updateUserDto)
    //         console.log(user)
    //    } catch (error) {
    //        console.log(error)
    //    }
    // }
    
    @Delete('delete/:id')
    async removeUser(@Param('id') id:string){
        return this.userService.deleteUser(id)
    }

//     @Get('')
//   @UseGuards(AuthGuard,new RolesGuard(1))
//   testApi(@GetUser() user) {
//     // console.log(user)
//        return user
//   }
}
