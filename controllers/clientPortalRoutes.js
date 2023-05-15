const path = require("path");
const router = require("express").Router();
const { Client, Invoice, Event } = require("../models");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

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
    const eventData = await Event.findAll({
      where: { clientId: req.session.currentClient, passed: false },
    });
    console.log(invoiceData);
    const events = eventData.map((i) => i.toJSON());
    console.log(events);
    res.status(200).render("clientPortal", { sesh, client, invoices, events });
  } catch (err) {
    res.status(500).json(err);
  }
});

// payment page
router.get("/pay", async (req, res) => {
  try {
    res.status(200).render("pay");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
