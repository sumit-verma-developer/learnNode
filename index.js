const express = require("express");
const path=require('path')
// const cors = require("cors");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");
const urlRoute = require("./routs/url");


const app = express();
const PORT = 3000;

// user (route ko call krta hain)-----> route(controller ko call krta hain)

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("View",path.resolve("./views"))

// connection
connectMongoDB("mongodb://localhost:27017/short-url")
  .then((res) => console.log("mongoDb connected"))
  .catch((error) => console.log("error", error));

const userRouter = require("./routs/user");
const URL = require("./models/url");
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.text"));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/url/", urlRoute);
app.use("/:shordId", async (req, res) => {
  const shortId = req.params.shordId;
  const entry= await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.get("/test", async(req,res)=>{
const allUrls=await URL.find({})
return res.end(`
  <html>
  <body>
  <h1>All URLs</h1>
  <table>
  </body>

  </html>`)
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
