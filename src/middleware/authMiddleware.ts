import { Request, Response, NextFunction } from 'express';
 import jwt from 'jsonwebtoken';

const SECRET_KEY = "rani";

// interface JwtPayload {
//   id: string;
//   email: string;
// }

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is in the format "Bearer token"

//   if (!token) {
//     return res.status(403).json({ message: "A token is required for authentication" });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }

//   return next();

//check if token exist
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    //verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: 'Failed to authenticate token'});
        }
        // (req as any).decode = decoded;
        // (req as any).decode = decoded;
        (req as any).user = decoded;   
        next();
    });
};
