const http = require("http");
const fs = require("fs");
const url = require('url');
const express = require("express");




const app = express();


app.get("/", (req, res) => {
  return  res.send("hello from express");
})


// URL - uniform resource locator
// protocal is set up  rule 
const myServer = http.createServer(app
    
  // console.log("hellow from server");
  // console.log(req);
//   const log = `${Date.now()} : ${req.url} New request recieved \n`;

//   const myUrl = url.parse(req.url,true);
//   console.log("myUrl",myUrl);
  
//   fs.appendFile("./log.txt", log, (err, data) => {
//     res.end("hello from server");
//     if (err) {
//       console.log(err);
//     }
//   });
);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
