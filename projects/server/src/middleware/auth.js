const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).send("Please login first");

  try {
    token = token.split(" ")[1];

    if (token === null || !token) return res.status(401).send("Access denied");

    let verifiedUser = jwt.verify(token, process.env.JWT_KEY);
    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token/Token Expired");
  }
};

module.exports = { verifyToken };
