const path = require("path");
const router = require("express").Router();
const { Client } = require("../models");

// homepage load
router.get("/", (req, res) => {
  try {
    const sesh = req.session;
    res.status(200).render("homepage", { sesh });
  } catch (err) {
    res.status(500).json(err);
  }
});

// services
router.get("/services", (req, res) => {
  try {
    const sesh = req.session;
    res.status(200).render("services", { sesh });
  } catch (err) {
    res.status(500).json(err);
  }
});

// about
router.get("/about", (req, res) => {
  try {
    const sesh = req.session;
    res.status(200).render("about", { sesh });
  } catch (err) {
    res.status(500).json(err);
  }
});

// contact
router.get("/contact", (req, res) => {
  try {
    const sesh = req.session;
    res.status(200).render("contact", { sesh });
  } catch (err) {
    res.status(500).json(err);
  }
});

// contact
router.get("/reviews", (req, res) => {
  try {
    const sesh = req.session;
    res.status(200).render("reviews", { sesh });
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

// Client Logout
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      //res.status(204).json("message: You have been logged out").end();
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
  console.log("logged out");
});

module.exports = router;
