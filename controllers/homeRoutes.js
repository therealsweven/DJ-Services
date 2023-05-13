const path = require("path");
const router = require("express").Router();
const { Client } = require("../models");

// homepage load
router.get("/", (req, res) => {
  try {
    res.status(200).render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

// services
router.get("/services", (req, res) => {
  try {
    res.status(200).render("services");
  } catch (err) {
    res.status(500).json(err);
  }
});

// about
router.get("/about", (req, res) => {
  try {
    res.status(200).render("about");
  } catch (err) {
    res.status(500).json(err);
  }
});

// contact
router.get("/contact", (req, res) => {
  try {
    res.status(200).render("contact");
  } catch (err) {
    res.status(500).json(err);
  }
});

// contact
router.get("/reviews", (req, res) => {
  try {
    res.status(200).render("reviews");
  } catch (err) {
    res.status(500).json(err);
  }
});

// admin
router.get("/admin", async (req, res) => {
  try {
    const sesh = req.session;
    const clientData = await Client.findAll();
    const clients = clientData.map((client) => client.toJSON());
    console.log(clients);
    res.status(200).render("admin", { sesh, clients });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
