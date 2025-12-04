const router = require('express').Router();
const upload = require('../middlewares/upload.middleware');
const cloudinary = require('../utils/cloudinary');

// simple upload endpoint: expects 'file' field
router.post('/', upload.single('file'), async (req,res,next) => {
  try {
    if(!req.file) return res.status(400).json({ message: 'No file' });
    const streamifier = require('streamifier');
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'uploads' }, (error, result) => {
          if(result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req.file.buffer);
    res.json(result);
  } catch(err){ next(err); }
});

module.exports = router;
