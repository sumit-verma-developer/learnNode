const { getUserId } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) res.redirect("/login");
  const user = getUserId(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}


module.exports={
    restrictToLoggedinUserOnly
}
