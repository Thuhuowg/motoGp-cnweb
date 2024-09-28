import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "@nestjs/class-validator";

@Injectable()
export class CreateTeamDto {
    @IsNotEmpty()
    @IsString()
    team_name

    @IsNotEmpty()
    @IsString()
    motobike

    @IsNotEmpty()
    @IsString()
    moto_brand

    @IsNotEmpty()
    @IsString()
    moto_image
}