import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
const db=mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/seed',seedRouter);


app.use('/api/products',productRouter)
app.use('/api/users',userRouter)

app.use('/api/orders', orderRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });


const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("listening")
})