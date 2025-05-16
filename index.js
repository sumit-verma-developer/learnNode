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

const express = require("express");
const fs = require("fs");

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

app.get("/users", (req, res) => {
  const html = `<ul>
    ${user.map((user) => `<li> ${user.department}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(user);
});

// dynamic route
app.get("/api/users:id", (req, res) => {
  const id = req.params.id;
  const userData = user.find((userr) => userr.id === Number(id));
  return res.json(userData);
});

// post
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    const userData = user.find((userr) => userr.id === Number(id));
    return res.json(userData);
  })
  .patch((req, res) => {
    const id = req.params.id;
    const userData = user.find((userr) => userr.id === Number(id));

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.indexOf(userData);
    user[index] = { ...user[index], ...req.body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update user" });
      }
      return res.json({
        message: "User updated",
        data: user[index],
      });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const userData = user.find((userr) => userr.id === Number(id));

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = user.indexOf(userData);
    user.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to delete user" });
      }
      return res.json({
        message: "User deleted",
      });
    });
  });

// data kis typoe ka ye express ko nhi pta hain usko handle krne ke liye middle ware use hota hain.
//middle ware  har request ke sath chalta hain.
// ek code mein multiple middle ware use ho skte hain. its like plugin

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("body", body);
  // use middleware to parse the data
  user.push({ ...body, id: user.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) {
      console.log(err);
    }
    return res.json({ staus: "success", id: user.length });
  });
});

//

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
