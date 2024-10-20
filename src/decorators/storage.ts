import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads', // Thư mục lưu trữ
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  },
});