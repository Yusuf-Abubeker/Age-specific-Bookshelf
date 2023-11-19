const jwt = require("jsonwebtoken");
const config = require("config");

function auth() {
  return function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access Denieddd");

    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.user = decoded;

      // Check if the user has the required role
      if (req.user.username !== "yusuf") {
        return res.status(403).send("Access Forbidden"); // Role mismatch
      }

      next();
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  };
}

module.exports = auth;
