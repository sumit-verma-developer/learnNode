const { getUser } = require("../services/auth");

// for cookie
// authentication
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookie?.token;
  if (!tokenCookie) return next();

  const token = tokenCookie; // Bearer [2343636234]
  const user = getUser(token);
  req.user = user;
  next();
}

// function checkForAuthentication(req, res, next) {
//   const authorizationHeaderValue = req.headers["authorization"];
//   if (
//     !authorizationHeaderValue ||
//     authorizationHeaderValue.startsWith("Bearer")
//   )
//     return next();

//   const token = authorizationHeaderValue.split("Bearer")[1]; // Bearer [2343636234]
//   const user = getUser(token);
//   req.user = user;
//   next();
// }

//Authrization
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthrized");
    return next();
  };
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   //
// const userUid = req.cookies.uid; // for cookies

//   const userUid = req.headers['authorization'];

//   if (!userUid) return res.redirect("/user/login");
//   // const user = getUser(userUid);
//   const token = userUid.split("Bearer")[1]; // Bearer [2343636234]
//   const user = getUser(token);

//   if (!user) return res.redirect("/user/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   // const user = getUser(userUid);

//   const userUid = req.headers['authorization'];
//   const token = userUid.split("Bearer")[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo,
  // restrictToLoggedinUserOnly,
  // checkAuth,
};
