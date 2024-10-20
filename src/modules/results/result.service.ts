import { Injectable } from "@nestjs/common";
import { ResultRepo } from "src/repositories/result.repository";

@Injectable() 
export class ResultService {
    constructor(
        private readonly resultRepo: ResultRepo,
    ) {}

    async getResultByRace(race_id: string) {
        try {
            const data = await this.resultRepo.getResult(race_id);

            // Kiểm tra nếu dữ liệu không rỗng
            if (!data || !Array.isArray(data) || data.length === 0) {
                throw new Error('No results found for the given race_id');
            }

            // Lấy thời gian của tay đua đầu tiên (có điểm số cao nhất)
            const firstFinish = data[0].duration;

            // Chuyển đổi thời gian đầu tiên thành đối tượng Duration
            const firstDuration = {
                minutes: firstFinish.minutes,
                seconds: firstFinish.seconds,
                milliseconds: firstFinish.milliseconds,
            };

            for (const item of data) {
                const time = item.duration; // Thời gian của tay đua hiện tại

                // Ghi log dữ liệu của tay đua
                console.log(`Checking duration for rider: ${item.rider_code}`, time);

                // Kiểm tra thời gian hiện tại có hợp lệ không
                if (!time || 
                    typeof time.minutes !== 'number' || 
                    typeof time.seconds !== 'number' || 
                    typeof time.milliseconds !== 'number') {
                    throw new Error(`Invalid duration for rider: ${item.rider_code} with duration: ${JSON.stringify(time)}`);
                }

                // Sử dụng let để có thể cập nhật giá trị
                let secondsDifferent = firstDuration.seconds - time.seconds;
                let millisecondsDifferent = firstDuration.milliseconds - time.milliseconds;

                // Điều chỉnh nếu milliseconds có thể âm
                if (millisecondsDifferent < 0) {
                    secondsDifferent -= 1;
                    millisecondsDifferent += 1000;
                }

                // Tạo chuỗi thời gian chênh lệch
                const different = `${secondsDifferent}.${millisecondsDifferent}`;

                // Thêm chênh lệch vào đối tượng item
                item.different = different; // Thêm khóa mới vào item
            }

            return data;
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while retrieving results');
        }
    }

    async getListRace () {
        try {
            const data = await this.resultRepo.getListResult()
            return data || []
        } catch (error) {
            console.log(error)
        }
    }

}
