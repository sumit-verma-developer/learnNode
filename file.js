// file read and write operations 
// using fs module (built-in module)
// fs module is used to interact with the file system asysnchronously or synchronously call.


const fs = require('fs');


//importent to use the fs module
// sysnchronous call
fs.writeFileSync("./test.txt", "Hello buddy!"); // write to file

// Asysnchronous call
fs.writeFile("./test.txt", "Hello buddy  Asysnchronous call !", (err) => { 

}); 

// sysnchronous call return
const result = fs.readFileSync("./contact.txt", "utf-8"); // read file
console.log("result",result);



// Asysnchronous call not blocking and not return anything
const resultd = fs.readFile("./contact.txt", "utf-8", (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log("Asysnchronous", result);
})


// fs.mkdirSync("./my-docs"); // create directory
// create folder
fs.mkdirSync("./my-docs/document/first",{recursive:true}); // create directory