import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import {Repository} from "typeorm"
import { CreateUserDto } from "src/dto/CreateUserDto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepo
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async createUser(createUserDto : CreateUserDto) :Promise<User>{
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
        // Tạo người dùng mới với mật khẩu đã mã hóa
        const user = this.userRepository.create({
          ...createUserDto,
          password: hashedPassword, // Sử dụng mật khẩu đã mã hóa
        });
        return await this.userRepository.save(user)
    }
    async getUser():Promise<User[] | null> {
        return await this.userRepository.find();
    }
    async getEmailUser(order_code:string){
        const query =`SELECT DISTINCT u.email FROM transactions t 
        LEFT JOIN orders o ON t.order_code =o.order_code 
        LEFT JOIN users u ON o.user_id = u.id 
        WHERE t.order_code ='${order_code}'`
        const result= await this.userRepository.query(query)
        console.log('user repo',result)
        return result[0]
    }
    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({where: {id:id}})
    }
    async getUserByName (name:string): Promise <User |null>{
        return await this.userRepository.findOne({where: {username:name}})
    }

    async getUserByEmail (email:string): Promise<User | null>{
        // const query = `select * from users where email = '${email}'`

        // const data = await this.userRepository.query(query)
        // console.log('data',data[0])
        // return data[0]
        return await this.userRepository.findOne({where: {email:email}})
    }
    // async updateUser(id: string, updateUserDto : UpdateUserDto): Promise<User>{
    //     const user = await this.userRepository.findOne({ where: { id: id } });
    //     if (user) {
    //       Object.assign(user, updateUserDto);
    //       return this.userRepository.save(user);
    //     }
    //     throw new Error('User not found');
    // }
    async deleteUser(id:string): Promise<User>{
        const user = await this.userRepository.findOne({where: {id:id}})
        if(user){
            return this.userRepository.remove(user)
        }else{
            throw new Error('User not found');
        }
    }
    async isEmailUnique(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return !user; // Nếu không tìm thấy người dùng, trả về true
      }
}