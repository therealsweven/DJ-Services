const path = require("path");
const router = require("express").Router();
const { Client } = require("../models");

// dashboard load
router.get("/", async (req, res) => {
  try {
    const sesh = req.session;
    if (!req.session.loggedIn) {
      res.redirect("/");
    }
    const clientData = await Client.findOne({
      where: { id: req.session.currentClient },
    });
    const client = clientData.toJSON();
    console.log(client);
    res.status(200).render("clientPortal", { sesh, client });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
