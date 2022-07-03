const express = require("express");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const products = require("./routes/products");
const user = require("./routes/user");
const review = require("./routes/review");
const orders = require("./routes/orders");
const cart = require("./routes/cart");
const category = require("./routes/category");
const upload = require("./routes/upload");
const fileupload = require("express-fileupload");
const cors = require("cors");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));
app.use("/users", user);
app.use("/review", review);
app.use("/products", products);
app.use("/orders", orders);
app.use("/category", category);
app.use("/review", review);
app.use("/cart", cart);
app.use("/upload", upload);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/client/build")));
  app.use(express.static("/cart"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(path.resolve(), "client", "build", "index.html"))
  );
}
// app.use(errorHandler);
// app.use(notFound);

app.get("/config/paypal", (req, res) => {
  res.json(process.env.CLIENT_ID);
});
const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server runnng at PORT ${PORT}`));
