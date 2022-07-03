const router = require("express").Router();
const { adminProtect, userProtect } = require("../middlewares/protect");
const connection = require("../config/db");
const { nanoid } = require("nanoid");
const { generateToken } = require("../utils/userUtils");
const bcrypt = require("bcryptjs");

// // register a user

router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let sql = `SELECT email from user where email = "${email}"`;
    connection.query(sql, async function (err, results) {
      if (err) {
        console.log(err);
        throw err;
      }
      if (results.length > 0) {
        res.status(400).json("Email already exist");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const _id = nanoid();
        connection.query(
          `insert into user(_id, name, email, phone, isAdmin, password, defaultAddress) values("${_id}","${name}","${email}","",0,"${hashedPassword}","")`,
          function (error, result) {
            if (error) {
              console.log(error);
              throw error;
            } else {
              res.json({
                _id,
                name,
                email,
                phone: "",
                defaultAddress: "",
                isAdmin: false,
                token: generateToken(_id),
              });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let sql = `SELECT * from user where email = "${email}"`;
    connection.query(sql, async function (err, results) {
      if (err) {
        throw err;
      }
      if (results.length === 0) {
        res.status(400).json("Wrong Email");
      } else {
        const data = results[0];
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
          return res.status(400).json("Wrong password");
        }

        res.json({
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          isAdmin: data.isAdmin === 0 ? false : true,
          defaultAddress: data.defaultAddress,
          token: generateToken(data._id),
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// // all users

router.get("/", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query("select * from user", function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// // get user profile
router.get("/profile", userProtect, async (req, res) => {
  try {
    const sql = `select * from user where _id="${req.user._id}"`;
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.json(result[0]);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// update profile
router.put("/profile", userProtect, async (req, res) => {
  try {
    connection.query(
      `select * from user where _id="${req.user._id}"`,
      async function (err, result) {
        if (err) {
          throw err;
        } else {
          const user = result[0];
          const isPassword = req.body.password ? true : false;
          const salt = await bcrypt.genSalt(10);
          const newPassword = isPassword
            ? await bcrypt.hash(req.body.password, salt)
            : user.password;

          let sql = `UPDATE user set name="${
            req.body.name || user.name
          }", email="${req.body.email || user.email}", phone="${
            req.body.phone || user.phone
          }",defaultAddress="${
            req.body.defaultAddress || user.defaultAddress
          }", password="${newPassword}" where _id="${req.user._id}"`;

          connection.query(sql, function (error, results) {
            if (error) {
              throw error;
            } else {
              const sql = `select * from user where _id="${req.user._id}"`;
              connection.query(sql, function (er, rs) {
                if (er) throw er;
                else
                  res.json({
                    _id: rs[0]._id,
                    name: rs[0].name,
                    email: rs[0].email,
                    isAdmin: rs[0].isAdmin,
                    phone: rs[0].phone,
                    defaultAddress: rs[0].defaultAddress,
                    token: generateToken(rs[0]._id),
                  });
              });
            }
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// // a single user

router.get("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    const sql = `select * from user where _id="${req.params.id}"`;
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.json(result[0]);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.put("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query(
      `select * from user where _id="${req.params.id}"`,
      function (err, result) {
        if (err) {
          throw err;
        } else {
          const user = result[0];
          const name = req.body.name || user.name;
          const email = req.body.email || user.email;
          let isAdmin = req.body.isAdmin || user.isAdmin;
          isAdmin = isAdmin === true ? 1 : 0;
          let sql = `UPDATE user set name="${name}", email="${email}", isAdmin=${isAdmin} where _id="${req.params.id}"`;

          connection.query(sql, function (error, results) {
            if (error) {
              throw error;
            } else {
              const sql = `select * from user where _id="${req.params.id}"`;
              connection.query(sql, function (er, rs) {
                if (er) throw er;
                else
                  res.json({
                    _id: rs[0]._id,
                    name: rs[0].name,
                    email: rs[0].email,
                    isAdmin: rs[0].isAdmin,
                    phone: rs[0].phone,
                    defaultAddress: rs[0].defaultAddress,
                    token: generateToken(rs[0]._id),
                  });
              });
            }
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.delete("/:id", userProtect, adminProtect, async (req, res, next) => {
  try {
    connection.query(
      `delete from user where _id="${req.params.id}"`,
      function (err, result) {
        if (err) {
          throw err;
        } else {
          res.json("User deleted");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
