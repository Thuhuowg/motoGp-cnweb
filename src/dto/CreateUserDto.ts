import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";
import { Injectable } from "@nestjs/common";
import { IsUnique } from "src/decorators/validate-custom";

@Injectable()
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username

    @IsNotEmpty()
    @IsUnique()
    @IsEmail()
    email

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password



}