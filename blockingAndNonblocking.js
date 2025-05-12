const fs = require("fs");
const os = require("os");

console.log(os.cpus().length); // get number of cpu cores

// console.log("1");

// // blocking operation
// const result = fs.readFileSync("./contact.txt", "utf-8"); // read file
// console.log("result", result);

// console.log("2");

// output 1 result 2

// // non-blocking operation
console.log("start");

// non-blocking operation
fs.readFile("./contact.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("nonblocking", result);
});

console.log("end");

// output start  end
