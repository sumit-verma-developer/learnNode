const fs=require('fs');
const { model } = require('mongoose');

function logReqRes(filename){
return (req,res,next)=>{
    fs.appendFile("log.txt", `${Date.now()} :  ${req.ip}: ${req.method}: ${req.path}` + "\n", (err,data) => {
        if (err) {
          console.log(err);
        }
        next();
      });
}
}

module.exports={
    logReqRes
}