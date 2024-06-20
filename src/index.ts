import express from "express";
import { myDataSource } from './datasource'
import dotenv from "dotenv";
import {userRouter} from "./routes/userRoutes";
import { photoRouter } from "./routes/photoRoutes";
import cors from "cors";
import path from 'path';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/photos', photoRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Photo Sharing Platform')
  })
//    app.use(express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
