const jwt = require("jsonwebtoken");

const Authorize = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        console.log("err");
        res.status(401);
        return res.json({ err: "User is not authorized" });
      }
     
      next();
    });
  } else {
    return res
      .status(401)
      .json({ err: "User is not authorized or token is missing" });
  }
};

module.exports = Authorize;
