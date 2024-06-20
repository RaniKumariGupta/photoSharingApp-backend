import multer from 'multer';
import path from 'path';
import { Request } from 'express';

type MulterFile = Express.Multer.File;


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


function checkFileType(file: MulterFile, cb: multer.FileFilterCallback) {
    
    const filetypes = /jpeg|jpg|png|gif/;
    
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Images only!'));
    }
}

export { upload };
