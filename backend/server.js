import express from 'express'
import data from './data.js'
import 'dotenv/config'
import mongoose from 'mongoose';

const db=mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const app=express();

app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.get('/api/products/slug/:slug',(req,res)=>{
    const params=req.params
    const {slug} =params
    const product=data.products.find(x=>x.slug===slug)
    if(product){
        res.send(product)
    }
    else{
        res.sendStatus(404)
    }
    
})

app.get('/api/products/:id',(req,res)=>{
    const {id}=req.params
    const product=data.products.find(x=>x._id===id)
    if(product){
        res.send(product)
    }
    else{
        res.sendStatus(404)
    }
})

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("listening")
})