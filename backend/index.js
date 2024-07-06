const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const {connectDB} = require('./connection');
const userRouter = require('./routes/user');

connectDB("mongodb://localhost:27017/chatKro");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})