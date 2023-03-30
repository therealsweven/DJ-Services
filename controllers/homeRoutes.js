const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  //const sesh = req.session;
  try {
    //console.log(req.session);

    res.status(200).render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});
