const express = require("express");

const router = express.Router();




router.get("/users", (req, res) => {
    const html = `<ul>
      ${user.map((user) => `<li> ${user.department}</li>`).join("")}
      </ul>`;
    res.send(html);
  });
  
  router.get("/", (req, res) => {
    return res.json(user);
  });
  
  // dynamic route
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const userData = user.find((userr) => userr.id === Number(id));
    return res.json(userData);
  });
  
  // post
  router
    .route("/:id")
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
  
  router.post("/", (req, res) => {
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
  

  module.exports = router;