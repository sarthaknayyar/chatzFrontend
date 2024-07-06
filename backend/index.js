const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const {connectDB} = require('./connection');
const userRouter = require('./routes/user');
const { checkLoggedin } = require('../../blog/backend/middlewares/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

connectDB("mongodb://localhost:27017/chatKro");

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(checkLoggedin);

app.use('/user',userRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})