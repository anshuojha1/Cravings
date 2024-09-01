const { verify } = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../constants/httpSatus");

 const authMid = (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }
  // console.log("this is mid response",res);
  return next();
};

module.exports = authMid;