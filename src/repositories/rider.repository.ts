import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rider } from "src/models/rider.entity";
import { Repository } from "typeorm";
@Injectable()
export class RiderRepo {
    constructor (
        @InjectRepository(Rider)
        private readonly riderRepository : Repository<Rider>
    ) {}
    

}