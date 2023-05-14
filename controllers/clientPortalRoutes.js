const path = require("path");
const router = require("express").Router();
const { Client, Invoice } = require("../models");

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
    const invoiceData = await Invoice.findAll({
      where: { clientId: req.session.currentClient, active: true },
    });
    console.log(invoiceData);
    const invoices = invoiceData.map((i) => i.toJSON());
    console.log(invoices);
    res.status(200).render("clientPortal", { sesh, client, invoices });
  } catch (err) {
    res.status(500).json(err);
  }
});

// payment page
router.get("/pay", async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
