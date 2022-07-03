const path = require("path");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json(`Please upload a file`);
    }

    const file = req.files.file;

    // Create custom filename
    file.name = `${file.name.split(".")[0]}-${Date.now()}${
      path.parse(file.name).ext
    }`;

    file.mv(`uploads/${file.name}`, async (err) => {
      if (err) {
        throw err;
      }

      res.send(`/uploads/${file.name}`);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
