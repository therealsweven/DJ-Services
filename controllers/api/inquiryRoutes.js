const router = require("express").Router();
const { sendConfirmation, sendInfoToMe } = require("../../utils/helpers");

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
    const email1 = await sendConfirmation(req.body);
    const email2 = await sendInfoToMe(req.body);
    if (email2.response) {
      console.log("Email Sent", email1, email2);
      return res.status(200).json("contact request received");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
