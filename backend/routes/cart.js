const router = require("express").Router();
const { userProtect } = require("../middlewares/protect");
const connection = require("../config/db");
const { nanoid } = require("nanoid");
router.post("/", userProtect, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const { user, name, image, countInStock, qty, product, price, selected } =
      req.body;
    const _id = nanoid();
    const createdAt = Date.now();
    connection.query(
      `insert into cart(_id, user, name, image, countInStock, qty, product, price, selected,  createdAt) values("${_id}", "${user}", "${name}", "${image}", ${countInStock}, ${qty}, "${product}", ${price}, ${selected}, "${createdAt}")`,
      function (err, result) {
        if (err) throw err;
        else res.json("Item added to cart");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.put("/:id", userProtect, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const {
      user,
      name,
      image,
      countInStock,
      qty,
      product,
      price,
      selected,
      size,
    } = req.body;
    const _id = nanoid();

    const createdAt = Date.now();

    connection.query(
      `select * from cart where product="${req.params.id}"`,
      function (cerr, crs) {
        if (cerr) throw cerr;
        else {
          if (crs.length > 0) {
            connection.query(
              `update cart set   name="${name}", image="${image}", countInStock=${countInStock}, qty=${qty}, product="${req.params.id}", price=${price}, selected=${selected}, size="${size}" where product="${req.params.id}"`,
              function (err, result) {
                if (err) throw err;
                else res.json("cart updated");
              }
            );
          } else {
            connection.query(
              `insert into cart(_id, user, name, image, countInStock, qty, product, price, selected,size,  createdAt) values("${_id}", "${user}", "${name}", "${image}", ${countInStock}, ${qty}, "${product}", ${price}, ${selected},"${size}", "${createdAt}")`,
              function (err, result) {
                if (err) throw err;
                else res.json("Item added to cart");
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.put("/qty/:id", userProtect, async (req, res) => {
  try {
    connection.query(
      `update cart set qty=${req.body.qty} where _id="${req.params.id}"`,
      function (err, result) {
        if (err) throw err;
        else res.json("cart updated");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// get your carts
router.get("/", userProtect, async (req, res) => {
  try {
    connection.query(
      `select * from cart where user="${req.user._id}"`,
      function (err, result) {
        if (err) throw err;
        else res.json(result);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.delete("/:id", userProtect, async (req, res, next) => {
  try {
    connection.query(
      `delete from cart where _id="${req.params.id}"`,
      function (err, result) {
        if (err) throw err;
        else res.json("item deleted");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
