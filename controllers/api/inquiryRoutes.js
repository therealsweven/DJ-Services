const router = require("express").Router();

const { Inquiry } = require("../../models");

// const inquiry = {
//   name: name,
//   email: email,
//   phone: phone,
//   message: message,
//   commMethod: commMethod,
// };

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    req.body.active = true;
    await Inquiry.create(req.body);
    res.status(200).json("contact request received");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;