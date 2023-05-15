const router = require("express").Router();
const { sendConfirmation, sendInfoToMe } = require("../../utils/helpers");

const { Inquiry } = require("../../models");

// create inquiry
router.post("/", async (req, res) => {
  try {
    if (!req.body.date) {
      req.body.date = "none specified";
    }
    if (!req.body.package) {
      req.body.package = "none specified";
    }
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

// get all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll();

    if (inquiries) {
      return res.status(200).json(inquiries);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update inquiry
router.put("/:id", async (req, res) => {
  try {
    const inquiryData = await Inquiry.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(inquiryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete inquiry
router.delete("/:id", async (req, res) => {
  try {
    await Inquiry.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("inquiry deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
