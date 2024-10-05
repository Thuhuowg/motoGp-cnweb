import { Injectable } from "@nestjs/common";
import { RiderRepo } from "src/repositories/rider.repository";

@Injectable()
export class RiderService {
    constructor (
        private readonly riderRepo: RiderRepo  
     ) {}
    async getListRider(search?: string) {
        try {
            return await this.riderRepo.getListRider(search)
        } catch (error) {
            return 'da co loi'
        }
    }
    async getRiderByCode (rider_code: string) {
        try {
            return await this.riderRepo.getRiderByCode(rider_code)
        } catch (error) {
            return 'da co loi'
        }
    }
}