const router = require("express").Router();
const { userProtect } = require("../middlewares/protect");
const connection = require("../config/db");
const { nanoid } = require("nanoid");

router.post("/:id", userProtect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    connection.query(
      `select * from review where product="${req.params.id}"`,
      function (error, rs) {
        if (error) throw error;
        else {
          const product = rs;
          if (product.length > 0) {
            const alreadyReviewed = product.find(
              (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
              return res.status(400).json("Product already reviewed");
            } else {
              const createdAt = Date.now();
              const _id = nanoid();
              const sql = `
            insert into review(_id, rating, comment,user,createdAt,product ) values("${_id}", ${rating}, "${comment}", "${req.user._id}", "${createdAt}", "${req.params.id}") 
            `;

              connection.query(sql, function (err, result) {
                if (err) throw err;
                else {
                  connection.query(
                    `select * from review where product="${req.params.id}"`,
                    function (rerr, rres) {
                      if (rerr) throw rerr;
                      else {
                        if (rres.length > 0) {
                          const totalRating =
                            rres.reduce((acc, item) => item.rating + acc, 0) /
                            rres.length;
                          connection.query(
                            `update product set rating=${totalRating} where _id="${req.params.id}"`,
                            function (uerr, ures) {
                              if (uerr) throw uerr;
                              else res.json("Review added");
                            }
                          );
                        } else {
                          connection.query(
                            `update product set rating=${rating} where _id="${req.params.id}"`,
                            function (uerr, ures) {
                              if (uerr) throw uerr;
                              else res.json("Review added");
                            }
                          );
                        }
                      }
                    }
                  );
                }
              });
            }
          } else {
            const createdAt = Date.now();
            const _id = nanoid();
            const sql = `
          insert into review(_id, rating, comment,user,createdAt,product ) values("${_id}", ${rating}, "${comment}", "${req.user._id}", "${createdAt}", "${req.params.id}") 
          `;

            connection.query(sql, function (err, result) {
              if (err) throw err;
              else {
                connection.query(
                  `select * from review where product="${req.params.id}"`,
                  function (rerr, rres) {
                    if (rerr) throw rerr;
                    else {
                      if (rres.length > 0) {
                        const totalRating =
                          rres.reduce((acc, item) => item.rating + acc, 0) /
                          rres.length;
                        connection.query(
                          `update product set rating=${totalRating}, numReviews=${rres.length} where _id="${req.params.id}"`,
                          function (uerr, ures) {
                            if (uerr) throw uerr;
                            else res.json("Review added");
                          }
                        );
                      } else {
                        connection.query(
                          `update product set rating=${rating}, numReviews=${1} where _id="${
                            req.params.id
                          }"`,
                          function (uerr, ures) {
                            if (uerr) throw uerr;
                            else res.json("Review added");
                          }
                        );
                      }
                    }
                  }
                );
              }
            });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

router.get("/:id", userProtect, async (req, res) => {
  try {
    connection.query(
      `select * from review where product="${req.params.id}"`,
      function (err, results) {
        if (err) throw err;
        else {
          res.json(results);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
