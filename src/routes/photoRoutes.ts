import express, { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/uploadMiddleware';
import { verifyToken } from '../middleware/authMiddleware';
import { uploadPhoto, getAllUserPhotos, deletePhoto, editPhoto, exploreAllPhotos, getPhotoById } from '../controllers/photoController';

const photoRouter: Router = express.Router();

photoRouter.post('/upload', verifyToken, upload.single('image'), uploadPhoto);

 photoRouter.get('/user-photos', verifyToken, getAllUserPhotos);
 photoRouter.get('/explore', exploreAllPhotos);
 
  photoRouter.get('/:photoId', verifyToken, getPhotoById);

 photoRouter.delete('/delete/:photoId', verifyToken, deletePhoto); 

photoRouter.put('/edit/:photoId', verifyToken, upload.single('image'), editPhoto);


export { photoRouter };