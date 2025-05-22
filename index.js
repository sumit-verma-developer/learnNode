const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");
const urlRoute = require("./routs/url");
const staticRoute = require('./routs/staticRouter')
const authuserRoute = require("./routs/authuser");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");


const app = express();
const PORT = 3000;

// user (route ko call krta hain)-----> route(controller ko call krta hain)

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.use(cookieParser());

// Routes

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user", authuserRoute);
app.use("/static", staticRoute);

app.get("/", (req, res) => {
  return res.redirect("/static");
});

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/login", (req, res) => {
  return res.render("login");
});




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
