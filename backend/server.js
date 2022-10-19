import express from 'express'
import data from './data.js'
import 'dotenv/config'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';

const db=mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const app=express();
app.use('/api/seed',seedRouter);


app.use('/api/products',productRouter)



const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("listening")
})