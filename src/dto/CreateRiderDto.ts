import { IsDate, IsNotEmpty, IsNumber, IsString, Length } from "@nestjs/class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateRiderDto {
    @IsNotEmpty()
    @IsString()
    rider_code

    @IsNotEmpty()
    @IsString()
    @Length(1,20)
    first_name

    @IsNotEmpty()
    @IsString()
    lastname

    @IsNotEmpty()
    @IsString()
    nationality

    @IsNotEmpty()
    @IsDate()
    date_of_birth

    @IsNumber()
    championship

    @IsNotEmpty()
    @IsString()
    rider_image

    @IsNotEmpty()
    @IsString()
    weight

    @IsNotEmpty()
    height

    @IsNotEmpty()
    @IsString()
    rider_story

}
