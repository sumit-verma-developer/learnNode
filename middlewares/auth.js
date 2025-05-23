const { getUser } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const userUid = req.cookies.uid; // for cookies 

  const userUid = req.headers['authorization'];
 
  if (!userUid) return res.redirect("/user/login");
  // const user = getUser(userUid);
  const token = userUid.split("Bearer")[1]; // Bearer [2343636234] 
  const user = getUser(token);

  if (!user) return res.redirect("/user/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // const userUid = req.cookies?.uid;
  // const user = getUser(userUid);

  const userUid = req.headers['authorization'];
  const token = userUid.split("Bearer")[1]; 
  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
