import { Request, Response } from "express";
import { User } from "../entity/UserEntity"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
// import { getRepository } from "typeorm";
import { myDataSource } from "../datasource";


const SECRET_KEY = "rani";
const userRepository = myDataSource.getRepository(User)

export const register = async (req:Request, res:Response) => {
    console.log("received reg request:", req.body);
     const { firstName, lastName, email, password } = req.body;
    
     try{
        if (!firstName||!lastName || !email || !password) {
            return res.status(400).json({ message: "Field are empty" });
        }
        const existingUser = await userRepository.findOne({where: {email}});
        if(existingUser){
            return res.status(400).json({message: "User already exits"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const result = await userRepository.save(newUser);

        const token = jwt.sign({email : result.email, id : result.id}, SECRET_KEY, { expiresIn: '3w'});
        res.status(201).json({user: result, token: token});
     } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
     }
}

export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({message: "Email is required"});
        }
        const existingUser = await userRepository.findOne({ where: { email } });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!existingUser.password) {
            return res.status(400).json({ message: "Password is not set for this user" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY, { expiresIn: '3w'});
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log("Error during:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


//for profile part ko code
export const getProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
  
    try {
      const user = await userRepository.findOne({ where: { id: userId }, relations: ['photos'] });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const updateProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { firstName, lastName } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;
  
    try {
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.profileImage = profileImage || user.profileImage;
  
      const updatedUser = await userRepository.save(user);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

export const userController = {
    register,
    login,
    getProfile,
    updateProfile,
}