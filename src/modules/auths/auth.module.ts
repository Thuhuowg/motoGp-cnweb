import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";

@Module({
    imports: [
        // ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true,}),
        TypeOrmModule.forFeature([User]),
        UserModule,
        JwtModule.register({
            global:true,
            // secret: process.env.ACCESS_SECRET_KEY,
            secret:'access-token',
            signOptions:{ expiresIn: '1d'}
        }),
    ],
    providers: [AuthService,AuthGuard],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}