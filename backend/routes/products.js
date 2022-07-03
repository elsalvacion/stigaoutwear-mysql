const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { adminProtect, userProtect } = require("../middlewares/protect");
const fs = require("fs");
const connection = require("../config/db");
const { nanoid } = require("nanoid");
router.post("/", userProtect, adminProtect, async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      user: req.user._id,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: 0,
      description: req.body.description,
      discount: req.body.discount,
      sizes: req.body.sizes,
      sizesType: req.body.sizesType,
    };
    const _id = nanoid();
    const createdAt = Date.now();
    const sql = `
      insert into product (_id,name, price, user, image, brand, sizesType, category, countInStock, numReviews, description, discount, createdAt, rating) values("${_id}",
        "${data.name}", ${data.price}, "${data.user}", "${data.image}", "${data.brand}",  "${data.sizesType}","${data.category}", ${data.countInStock},${data.numReviews}, "${data.description}", "${data.discount}", "${createdAt}", 0
      );
      `;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      else {
        connection.query(
          `delete from sizes where product="${req.params.id}"`,
          function (derr, dres) {
            if (derr) throw derr;
            else {
              data.sizes.forEach((size, i) => {
                connection.query(
                  `insert into sizes(product, size) values("${_id}","${size.value}")`,
                  function (serr, sres) {
                    if (serr) throw serr;
                    else {
                      if (i === data.sizes.length - 1)
                        res.json({
                          ...data,
                          _id,
                          createdAt,
                        });
                    }
                  }
                );
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

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      let query = `select * from product`;

      if (req.query.category)
        query += ` where category="${req.query.category}"`;

      if (req.query.keyword && !req.query.category) {
        query += ` where name like '%${req.query.keyword}%' or brand like '%${req.query.keyword}%' or category like '%${req.query.keyword}%' or description like '%${req.query.keyword}%'`;
      } else if (req.query.keyword && req.query.category) {
        query += ` and name like '%${req.query.keyword}%' or brand like '%${req.query.keyword}%' or category like '%${req.query.keyword}%' or description like '%${req.query.keyword}%'`;
      }

      // Pagination
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      query += ` order by createdAt + 0 desc`;
      let total = null;
      if (req.query.category) {
        connection.query(
          `select * from product where category="${req.query.category}" and name like '%${req.query.keyword}%' or brand like '%${req.query.keyword}%' or category like '%${req.query.keyword}%' or description like '%${req.query.keyword}%'`,
          function (err, count) {
            if (err) throw err;
            else total = count.length;
          }
        );
      } else {
        connection.query(
          `select * from product where name like '%${req.query.keyword}%' or brand like '%${req.query.keyword}%' or category like '%${req.query.keyword}%' or description like '%${req.query.keyword}%'`,
          function (err, count) {
            if (err) throw err;
            else total = count.length;
          }
        );
      }
      if (total >= 0) {
        query += ` limit ${limit} offset ${startIndex}`;
        connection.query(query, function (err, results) {
          if (err) throw err;
          else {
            connection.query("select * from product", function (error, rs) {
              if (error) throw error;
              // Pagination result
              const pagination = {};

              if (endIndex < total) {
                pagination.next = {
                  page: page + 1,
                  limit,
                };
              }

              if (startIndex > 0) {
                pagination.prev = {
                  page: page - 1,
                  limit,
                };
              }

              res.json({
                count: results.length,
                pagination,
                products: results,
                total,
              });
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  })
);

router.get("/:id", async (req, res) => {
  try {
    const sql = `select * from product where _id="${req.params.id}"`;

    connection.query(sql, function (err, results) {
      if (err) throw err;
      else {
        connection.query(
          `select review.*, user.name, user.email from review, user where review.product="${req.params.id}" and user._id=review.user `,
          function (rerr, rrs) {
            if (rerr) throw rerr;
            else {
              connection.query(
                `select * from sizes where product="${req.params.id}"`,
                function (serr, sres) {
                  if (serr) throw serr;
                  else {
                    res.json({
                      ...results[0],
                      reviews: rrs,
                      sizes: sres,
                    });
                  }
                }
              );
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

router.put(
  "/:id",
  userProtect,
  adminProtect,
  asyncHandler(async (req, res, next) => {
    try {
      const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        discount,
        sizes,
        sizesType,
      } = req.body;

      const sql = `update product set name="${name}", price=${price}, description="${description}", image="${image}", brand="${brand}", category="${category}", countInStock=${countInStock}, discount=${discount},  sizesType="${sizesType}" where _id="${req.params.id}"`;

      connection.query(sql, function (err, result) {
        if (err) throw err;
        else {
          connection.query(
            `delete from sizes where product="${req.params.id}"`,
            function (derr, dres) {
              if (derr) throw derr;
              else {
                sizes.forEach((size, i) => {
                  connection.query(
                    `insert into sizes(product, size) values("${req.params.id}","${size.value}")`,
                    function (serr, sres) {
                      if (serr) throw serr;
                      else {
                        if (i === sizes.length - 1) res.json("Product updated");
                      }
                    }
                  );
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
  })
);

router.delete("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query(
      `select * from product where _id="${req.params.id}"`,
      function (perr, pres) {
        if (perr) throw perr;
        let product = pres[0];
        const sql = `
delete from product where _id="${req.params.id}"
`;
        connection.query(sql, function (err, result) {
          if (err) throw err;
          else {
            let imageUrl = "";
            let imageArray = product.image.split("/");
            imageArray.forEach((file, i) =>
              i > 1
                ? (imageUrl = imageUrl + `/${file}`)
                : (imageUrl = imageUrl + file)
            );
            fs.unlinkSync(imageUrl);
            res.json("product removed");
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.get("/top/products", async (req, res, next) => {
  try {
    const sql = `select * from product order by RAND()  limit 3`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      else res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
