import { Injectable } from "@nestjs/common";
import { UserRepo } from "../../repositories/User.repository";
import { CreateUserDto } from "src/dto/CreateUserDto";
// import { UpdateUserDto } from "src/dto/UpdateUserDto";

@Injectable()
export class UserService {
    constructor (private readonly userRepo: UserRepo) {}
    async createUser(createUserDto : CreateUserDto){
        try {
            return await this.userRepo.createUser(createUserDto)
        } catch (error) {
            console.log(error)
        }
    }
    async getAllUser() {
        try{
            // const user = 'ok'
            const user = await this.userRepo.getUser()
            console.log(user)
            return user
        }catch(e){
            console.log(e)
        }
    }
    async getUsesrById(id: string){
        try {
           
            return await this.userRepo.getUserById(id)
        } catch (error) {
            console.log(error)
        }
    }
    async getUserByName(name: string){
        try {
            return await this.userRepo.getUserByName(name)
        } catch (error) {
            console.log(error)
        }
      
        
    }
    async isEmailUnique (email: string) {
        try {
            return await this.userRepo.isEmailUnique(email)
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByEmail (email:string) {
        const user= await this.userRepo.getUserByEmail(email)
        console.log(user)
        return user
    }
    // async updateUser(id:string, updateUserDto: UpdateUserDto){
    //     try {
    //         return await this.userRepo.updateUser(id,updateUserDto)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    async deleteUser(id:string){
        try {
            return await this.userRepo.deleteUser(id)
        } catch (error) {
            console.log(error)
        }
    }
    async getEmailUser(order_code:string){
        try {
        const email= await this.userRepo.getEmailUser(order_code)
        const test=JSON.stringify(email.email)
        console.log('user service',email,typeof email,email.email,test)
        return test
            
            
        } catch (error) {
            console.log(error)
        }
    }
   
}