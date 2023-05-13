const path = require("path");
const router = require("express").Router();

// dashboard load
router.get("/", (req, res) => {
  try {
    const sesh = req.session;
    if (!req.session.loggedIn) {
      res.redirect("/");
    }
    res.status(200).render("clientPortal", sesh);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
