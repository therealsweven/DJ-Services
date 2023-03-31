const path = require("path");
const router = require("express").Router();

router.post("/", (req, res) => {
  try {
    res.status(200).json("contact request received");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
