const router = require("express").Router();
const { userProtect, adminProtect } = require("../middlewares/protect");
const connection = require("../config/db");
const { nanoid } = require("nanoid");

router.post("/", userProtect, adminProtect, async (req, res) => {
  try {
    const _id = nanoid();

    const { title } = req.body;
    const createdAt = Date.now();
    connection.query(
      `insert into category(_id, title, createdAt) values("${_id}", "${title}", "${createdAt}")`,
      function (err, results) {
        if (err) throw err;
        else res.json("category created");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.put("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    const { title } = req.body;
    connection.query(
      `update  category set title="${title}" where _id="${req.params.id}"`,
      function (err, results) {
        if (err) throw err;
        else res.json("category updated");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// get your categorys
router.get("/", async (req, res) => {
  try {
    connection.query(`select * from category`, function (err, results) {
      if (err) throw err;
      else res.json(results);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.get("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query(
      `select * from category where _id="${req.params.id}"`,
      function (err, results) {
        if (err) throw err;
        else res.json(results[0]);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.delete("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query(
      `delete from category where _id="${req.params.id}"`,
      function (err, results) {
        if (err) throw err;
        else res.json("category deleted");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
