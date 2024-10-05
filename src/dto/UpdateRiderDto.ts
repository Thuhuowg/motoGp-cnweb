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

    @IsDate()
    date_of_birth

    @IsNumber()
    championship

    @IsString()
    rider_image
}
