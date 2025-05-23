const express = require("express");
const path = require("path");
// const cors = require("cors");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");
const urlRoute = require("./routs/url");
const staticRoute=require('./routs/staticRouter')
const authuserRoute = require("./routs/authuser");

const app = express();
const PORT = 3000;

// user (route ko call krta hain)-----> route(controller ko call krta hain)

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

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
// app.use("/api/users", userRouter);
// app.use("/url/", urlRoute);
app.use("/static",staticRoute)
app.use("/auth",authuserRoute)
// app.use("/:shordId", async (req, res) => {
//   const shortId = req.params.shordId;
//   try {
//     const entry = await URL.findOneAndUpdate(
//       { shortId: shortId },
//       {
//         $push: {
//           visitHistory: {
//             timestamp: Date.now(),
//           },
//         },
//       }
//     );

//     if (!entry) {
//       return res.status(404).send("Short URL not found");
//     }

//     res.redirect(entry.redirectURL);
//   } catch (err) {
//     console.error("Error in redirection:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", { urls: allUrls, name: "sumit" });
// });



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
