import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepo } from "src/repositories/User.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/User.entity";




@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService,
        UserRepo,
       
    ],
    exports:[UserService]
})
export class UserModule{};