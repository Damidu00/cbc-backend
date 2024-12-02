import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose'
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

const app = express();

const mongoUrl = process.env.MONGO_DB_URI

mongoose.connect(mongoUrl,{})
const connection = mongoose.connection; 

connection.once("open",() => {
    console.log("Database Connected!!");
})

app.use(bodyParser.json())

app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ","")
    
    if(token != null ){
        jwt.verify(token,"cbc-secret-key-2024",(error,decoded)=>{
            if(!error){
                req.user = decoded
            }
        })
    }

    next()

})

app.use("/api/products",productRouter)
app.use("/api/users",userRouter)

app.listen(5000,() =>{
    console.log('Server is running on port 5000')
})