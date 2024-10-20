import { Injectable } from "@nestjs/common";
import { CreateRiderDto } from "src/dto/CreateRiderDto";
import { UpdateRiderDto } from "src/dto/UpdateRiderDto";
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
    async getResultRiders () {
        try {
            return await this.riderRepo.getResultRiders()
        } catch (error) {
            return 'da co loi'
        }
    }
    async createRider(createRiderDto : CreateRiderDto) {
        try {
            return await this.riderRepo.createRider(createRiderDto)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteRider (rider_code:string) {
        try {
            console.log('iiii')
            return await this.riderRepo.softDelete(rider_code)
        } catch (error) {
            console.log(error)
        }
    }
    async updateRider (rider_code:string, updateRiderDto: UpdateRiderDto) {
        try {
            return await this.riderRepo.updateRider(rider_code,updateRiderDto)
        } catch (error) {
            console.log(error)
        }
    }
    async getRiderByCodeAdmin (rider_code: string) {
        try {
            return await this.riderRepo.getRiderByCodeAdmin(rider_code)
        } catch (error) {
            return 'da co loi'
        }
    }
    async getTrash() {
        try {
            return await this.riderRepo.getTrash()
        } catch (error) {
            console.log(error)
        }
    }
    async restore(rider_code:string){
        try {
            return await this.riderRepo.restore(rider_code)
        } catch (error) {
            console.log(error)
        }
    }
}