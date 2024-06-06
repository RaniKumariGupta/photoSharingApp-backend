import express, { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/uploadMiddleware';
import { verifyToken } from '../middleware/authMiddleware';
import { uploadPhoto, getAllUserPhotos, deletePhoto, editPhoto, exploreAllPhotos } from '../controllers/photoController';

const photoRouter: Router = express.Router();

photoRouter.post('/upload', verifyToken, upload.single('image'), uploadPhoto);

 photoRouter.get('/user-photos', verifyToken, getAllUserPhotos);

 photoRouter.delete('/delete/:photoId', verifyToken, deletePhoto); 

photoRouter.put('/edit/:photoId', verifyToken, upload.single('image'), editPhoto);

photoRouter.get('/explore', exploreAllPhotos);

export { photoRouter };