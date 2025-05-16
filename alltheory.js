//Express (or Express.js) is a web application framework for Node.js — designed to simplify the process of building web applications and APIs.

// 🔧 What Express Does:
// Express helps you:

// Create web servers and RESTful APIs easily.

// Handle HTTP requests and responses (GET, POST, PUT, DELETE, etc.).

// Manage routing (what should happen when someone visits /about or sends data to /api/data).

// Use middleware for things like authentication, logging, validation, error handling, and more.

// Serve static files (like images, CSS, and JavaScript) easily.

// ^5.1.0

// 0(last part )-Minor fixes(optional)
// 1(2nd part )-Recomnded changes(security, performance,fixed bugs )
// 3rd Major Released- Major / Breaking updates
// ~ minafixed only change kro last digit
// ^update last two digit
// MVC model view controller 
//jo controler hota hain wo model ko manipulate karta hain aur  jo model hota wo view ko update krta hain.

const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

// Middleware
//1 Middleware call
app.use(express.urlencoded({ extended: false })); // for form data,

// 2 Middleware call
app.use((req, res, next) => {
  console.log("1 Middleware");
  fs.appendFile("log.txt", `${Date.now()} :  ${req.ip}: ${req.method}: ${req.path}` + "\n", (err,data) => {
    if (err) {
      console.log(err);
    }
    next();
  });
 
});

// 3 Middleware call
app.use((req, res, next) => {
  console.log(" 2 Middleware");
  next();
  // return res.end("end middleware");
});

// Routs


//

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
