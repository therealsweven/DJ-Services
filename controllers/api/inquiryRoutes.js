const router = require("express").Router();
const { sendMail } = require("../../utils/helpers");

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
    const emailResult = await sendMail(req.body);
    console.log("Email Sent", emailResult);
    res.status(200).json("contact request received");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
