const jwt = require("jsonwebtoken");
const connection = require("../config/db");

const userProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json("Not Authorized: No Token");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      connection.query(
        `select * from user where _id="${decoded.id}"`,
        function (err, result) {
          if (err) {
            throw err;
          }
          const data = result[0];

          if (!data) {
            res.status(401).json("Not Authorized: No Token");
          } else {
            req.user = data;

            next();
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(401).json("Not Authorized: Invalid User");
    }
  }
};

const adminProtect = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("Not authorized as an admin");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json("Not authorized as an admin");
  }
};

module.exports = {
  userProtect,
  adminProtect,
};
