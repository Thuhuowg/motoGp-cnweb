import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' là tên field trong form
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Thông tin file được upload
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }
}
