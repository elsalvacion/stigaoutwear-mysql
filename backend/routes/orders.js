const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { userProtect, adminProtect } = require("../middlewares/protect");
const { sendOrder } = require("../utils/sendEmail");
const connection = require("../config/db");
const { nanoid } = require("nanoid");

router.post("/", userProtect, async (req, res) => {
  try {
    const _id = nanoid();
    const createdAt = Date.now();
    req.body.user = req.user._id;
    const {
      user,
      paymentMethod,
      shippingPrice,
      totalPrice,
      shippingInfo,
      selectedItems,
    } = req.body;
    connection.query(
      `insert into orders(_id,user,paymentMethod, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, createdAt) values("${_id}", "${user}", "${paymentMethod}", 0, ${shippingPrice}, ${totalPrice}, 0,"",0,"","${createdAt}");
      `,
      function (err, result) {
        if (err) throw err;
        else {
          connection.query(
            `insert into shippingInfo(orderId, city, address, phone) values("${_id}", "${shippingInfo.city}", "${shippingInfo.address}", "${shippingInfo.phone}")`,
            function (serr, sres) {
              if (serr) throw serr;
              else {
                connection.query(
                  `select orders.*, user.name from orders, user where orders._id="${_id}" and orders.user = user._id`,
                  function (error, rs) {
                    if (error) throw err;
                    else {
                      selectedItems.forEach((item, i) => {
                        connection.query(
                          `insert into selecteditem(orderId, name, qty, size,image, price, product) values("${_id}","${item.name}",${item.qty}, "${item.size}", "${item.image}", ${item.price}, "${item.product}")`,
                          function (e, r) {
                            if (e) throw e;
                            else {
                              if (i === selectedItems.length - 1) {
                                sendOrder(rs[0]);
                                res.json("order created");
                              }
                            }
                          }
                        );
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// get all orders
router.get("/", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query(
      `select * from orders order by createdAt`,
      function (oerr, ors) {
        if (oerr) throw oerr;
        else {
          if (ors.length > 0) {
            const orders = [];
            ors.forEach((order, i) => {
              connection.query(
                `select * from selecteditem where orderId="${order._id}";`,
                function (sierr, sires) {
                  if (sierr) throw sierr;
                  else
                    connection.query(
                      `select * from shippingInfo where orderId="${order._id}"`,
                      function (shierr, shires) {
                        if (shierr) throw shierr;
                        else {
                          connection.query(
                            `select name, email from user where _id="${order.user}"`,
                            function (uerr, ures) {
                              if (uerr) throw uerr;
                              else {
                                orders.push({
                                  ...order,
                                  selectedItems: sires,
                                  shippingInfo: shires[0],
                                  ...ures[0],
                                });
                                if (i === ors.length - 1) res.json(orders);
                              }
                            }
                          );
                        }
                      }
                    );
                }
              );
            });
          } else {
            res.json([]);
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// get your orders
router.get("/myorder", userProtect, async (req, res) => {
  try {
    let sql = `select * from orders where user="${req.user._id}" order by createdAt`;
    if (req.query.limit) {
      sql += ` limit ${req.query.limit}`;
    }
    connection.query(sql, function (oerr, ors) {
      if (oerr) throw oerr;
      else {
        if (ors.length > 0) {
          const orders = [];
          ors.forEach((order, i) => {
            connection.query(
              `select * from selecteditem where orderId="${order._id}";`,
              function (sierr, sires) {
                if (sierr) throw sierr;
                else
                  connection.query(
                    `select * from shippingInfo where orderId="${order._id}"`,
                    function (shierr, shires) {
                      if (shierr) throw shierr;
                      else {
                        orders.push({
                          ...order,
                          selectedItems: sires,
                          shippingInfo: shires[0],
                        });

                        if (i === ors.length - 1) res.json(orders);
                      }
                    }
                  );
              }
            );
          });
        } else res.json(ors);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

//  get order
router.get("/:id", userProtect, async (req, res) => {
  try {
    connection.query(
      `select * from orders where _id="${req.params.id}" order by createdAt`,
      function (oerr, ors) {
        if (oerr) throw oerr;
        else {
          const order = ors[0];
          connection.query(
            `select * from selecteditem where orderId="${order._id}";`,
            function (sierr, sires) {
              if (sierr) throw sierr;
              else
                connection.query(
                  `select * from shippingInfo where orderId="${order._id}"`,
                  function (shierr, shires) {
                    if (shierr) throw shierr;
                    else {
                      connection.query(
                        `select name, email from user where _id="${order.user}"`,
                        function (uerr, ures) {
                          if (uerr) throw uerr;
                          else {
                            res.json({
                              ...order,
                              selectedItems: sires,
                              shippingInfo: shires[0],
                              ...ures[0],
                            });
                          }
                        }
                      );
                    }
                  }
                );
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// router.put(
//   "/:id",
//   userProtect,
//   asyncHandler(async (req, res, next) => {
//     try {
//       const order = await Order.findByIdAndUpdate(req.params.id, {
//         new: true,
//       });
//       if (!order) {
//         res.status(400).json({ message: "Could not update order" });
//       } else {
//         res.send(order);
//       }
//     } catch (err) {
//       next(err);
//     }
//   })
// );

// router.put(
//   "/:id/pay",
//   userProtect,
//   asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.payer.email_address,
//       };

//       const updatedOrder = await order.save();

//       res.json(updatedOrder);
//     } else {
//       res.status(404);
//       throw new Error("Order not found");
//     }
//   })
// );

router.put("/:id/adminpay", userProtect, adminProtect, async (req, res) => {
  try {
    const paidAt = Date.now();

    connection.query(
      `update orders set isPaid=1, paidAt="${paidAt}" where _id="${req.params.id}"`,
      function (err, result) {
        if (err) throw err;
        else res.json("Order updated");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

//
router.put("/:id/admindeliver", userProtect, adminProtect, async (req, res) => {
  try {
    const deliveredAt = Date.now();

    connection.query(
      `update orders set isDelivered=1, deliveredAt="${deliveredAt}" where _id="${req.params.id}"`,
      function (err, result) {
        if (err) throw err;
        else res.json("Order updated");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// delete order

router.delete("/:id", userProtect, adminProtect, async (req, res) => {
  try {
    connection.query(
      `delete from orders where _id="${req.params.id}"`,
      function (err, result) {
        if (err) throw err;
        else res.json("Order deleted");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
