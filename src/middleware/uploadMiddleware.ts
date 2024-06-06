import multer from 'multer';
import path from 'path';
import { Request } from 'express';

type MulterFile = Express.Multer.File;

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req: Request, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, 
    fileFilter: function (req: Request, file: MulterFile, cb) {
        checkFileType(file, cb);
    }
//  }).single('image');
});
// });

// Check File Type
function checkFileType(file: MulterFile, cb: multer.FileFilterCallback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Images only!'));
    }
}

export { upload };
