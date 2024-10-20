import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "@nestjs/class-validator";
@Injectable()
export class LoginDto{

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}