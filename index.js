const express = require("express");
const cors = require("cors");
const {connectMongoDB}=require('./connection')
const {logReqRes}=require('./middlewares')


const app = express();
const PORT = 3000;

// connection 
connectMongoDB('mongodb://localhost:27017/express')
const userRouter = require("./routs/user");




//Routes
app.use(logReqRes,"log.text")
app.use('/user', userRouter);