import { IsDate, IsNotEmpty, IsNumber, IsString, Length } from "@nestjs/class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateRiderDto {
    @IsString()
    @Length(1,20)
    first_name

    @IsString()
    lastname

    @IsString()
    nationality

    @IsString()
    heigth

    @IsString()
    weight
}
