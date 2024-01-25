// this checkToken works like a bridge between FE and BE
// const jwt = require("jsonwebtoken");

// const checkToken = (req, res, next) => {
//   let token = req.headers.authorization;
//   req.user = null;
//   if (!token) {
//     throw new Error("Authorization Failed. no token received");
//   }
//   token = token.replace("Bearer ", "");
//   console.log("🚀 ~ checkToken ~ token:", token);
//   jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
//     if (err) {
//       throw new Error("Failed to verify token");
//     }
//     req.user = decoded;
//     // Optional - we are interested in the expiration
//     req.exp = new Date(decoded.exp * 1000);
//     return next();
//   });
// };
// module.exports = checkToken;