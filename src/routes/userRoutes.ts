import express, { Router } from 'express';
import { register, login } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';
const userRouter: Router = express.Router();

userRouter.post("/register", register);
 userRouter.post("/login", login);

userRouter.get('/profile', verifyToken, (req, res) =>{
    const user = (req as any).decoded;

    res.json({message: 'Protected route accessed', user });
});

 export { userRouter};
