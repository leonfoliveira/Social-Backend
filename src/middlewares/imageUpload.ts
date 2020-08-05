import multer from 'multer';
import RequestError from '../utils/RequestError';

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (_req, file, cb) => {
    cb(null, `${new Date().getTime()}.${file.mimetype.replace('image/', '')}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 1 MB
  },
  fileFilter: (_req, file, cb) => {
    const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(RequestError.INVALID_FILE_EXTENSION);
    }
  },
});

export default upload.single('image');
