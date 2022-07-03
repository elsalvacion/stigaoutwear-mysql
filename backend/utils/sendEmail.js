const nodemailer = require("nodemailer");
const connection = require("../config/db");

const sendOrder = (orderDetails) => {
  connection.query(
    `select email from user where isAdmin=1`,
    function (err, urs) {
      if (err) console.log(err);
      else {
        const users = urs.map((u) => u.email);
        console.log(users);
        connection.query(
          `select * from selecteditem where orderId="${orderDetails._id}"`,
          function (sierr, sires) {
            if (sierr) console.log(sierr);
            else {
              connection.query(
                `select * from shippingInfo where orderId="${orderDetails._id}"`,
                async function (shierr, shires) {
                  if (shierr) throw shierr;
                  else {
                    const order = {
                      ...orderDetails,
                      shippingInfo: {
                        ...shires[0],
                      },
                      selectedItems: sires,
                    };

                    const transporter = nodemailer.createTransport({
                      service: "gmail",
                      auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS,
                      },
                    });

                    const mailOptions = {
                      from: `Stiga Outwear <${process.env.EMAIL}>`,
                      to: users,
                      subject: "New Order",
                      html: `
                <div
                style="
                  width: 450px;
                  max-width: 80%;
                  margin: auto;
                  padding: 15px;
                  background: #d32f2f;
                  color: white;
                "
              >
                <h4 style="text-align: center; font-size: 32px; margin: 7px">
                  New Order
                </h4>
                <hr />
                <div class="orderDetails">
                  <div
                    style="
                     color: white;
                      margin: 15px 0;
                    "
                  >
                    <h6 style="font-size: 18px; margin: 5px 0">ORDER #</h6>
                    <span>${order._id}</span>
                  </div>
                  <div
                    style="
                     color: white;
                      margin: 15px 0;
                    "
                  >
                    <h6 style="font-size: 18px; margin: 5px 0"># items</h6>
                    <span>${order.selectedItems.length}</span>
                  </div>
                  <div
                    style="
                     color: white;
                      margin: 15px 0;
                    "
                  >
                    <h6 style="font-size: 18px; margin: 5px 0">Total Price</h6>
                    <span>D${order.totalPrice}</span>
                  </div>
                  <div
                    style="
                     color: white;
                      margin: 15px 0;
                    "
                  >
                    <h6 style="font-size: 18px; margin: 5px 0">Name</h6>
                    <span>${order.name}</span>
                  </div>
                  <div
                    style="
                     color: white;
                      margin: 15px 0;
                    "
                  >
                    <h6 style="font-size: 18px; margin: 5px 0">Phone</h6>
                    <span>${order.shippingInfo.address}</span>
                  </div>
                  <div
                    style="
                     color: white;
                      margin: 15px 0;
                    "
                  >
                    <h6 style="font-size: 18px; margin: 5px 0">Address</h6>
                    <span>${
                      order.shippingInfo.address + " " + order.shippingInfo.city
                    }</span>
                  </div>
                </div>
                <a
                  style="
                    text-decoration: none;
                    font-size: 16px;
                    padding: 10px;
                    display: block;
                    background: white;
                    text-align: center;
                    color: #d32f2f;
                    cursor: pointer;
                  "
                  href="https://stigaoutwear.com/#/order/${order._id}"
                  >VIEW</a
                >
              </div>
                `,
                    };

                    await transporter.sendMail(
                      mailOptions,
                      function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Email sent: " + info.response);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

module.exports = { sendOrder };
