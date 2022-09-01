import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import dayjs from 'dayjs';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    const nowDate = dayjs(Date.now()).format('YYMMDDHHMM');
    cb(null, `${nowDate}_${file.originalname}`);
  },
  // eslint-disable-next-line consistent-return
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG만 업로드하세요')); // 여기가 지금 안먹음
    }
    callback(null, true);
  },
  limits: {
    // fileSize: 1024 * 1024,
  },
});

const app = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const upload = multer({ storage });
app.post(upload.array('file'), function (req, res) {
  res.json(req.files.map((v) => v.filename));
});

export default app;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
