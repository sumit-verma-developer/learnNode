// const sessionIdToUserMap = new Map();  for state  full  maintain kr rhe the

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// state less  user ka data tokens ke andar rakhte hain

const jwt = require("jsonwebtoken");

const secretKey = "sumit@123$";
// create tokens for user (secret key means stamp)

function setUser(user) {
  //   const payload = {
  //     ...user,
  //   };
  return jwt.sign(
    {
      _id: user._id,
      email: user?.email,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(" verify token error", error);
  }
}

module.exports = {
  setUser,
  getUser,
};
