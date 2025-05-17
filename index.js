const express = require("express");
// const cors = require("cors");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 3000;

// user (route koo call krta hain)-----> route(controller ko call krta hain)

// connection
connectMongoDB("mongodb://localhost:27017/learn-node")
  .then((res) => console.log("mongoDb connected"))
  .catch((error) => console.log("error", error));

const userRouter = require("./routs/user");

//middleware

app.use(express.urlencoded({ extended: false })); 
app.use(logReqRes("log.text"), );

// Routes
app.use("/api/users", userRouter);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  