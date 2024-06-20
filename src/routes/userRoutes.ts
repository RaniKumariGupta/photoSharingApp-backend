import express, { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';
import { validateUserRegistration, validateUserLogin } from '../middleware/validationMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const userRouter: Router = express.Router();

userRouter.post("/register",validateUserRegistration, register);
 userRouter.post("/login",validateUserLogin, login);

 userRouter.get('/profile', verifyToken, getProfile);
 userRouter.put('/profile/edit', verifyToken, upload.single('profileImage'), updateProfile);


 export { userRouter};
