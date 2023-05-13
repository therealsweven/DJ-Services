const router = require("express").Router();
const { Client } = require("../../models");
//const emails = require("../../helpers/emails");
const { v4: uuidv4 } = require("uuid");

/* 
URL route:    /api/client
*/

//get client by session
router.get("/", async (req, res) => {
  try {
    const clientData = await Client.findAll({
      where: {
        id: req.session.currentClient,
      },
    });
    res.status(200).json(clientData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get client by id
router.get("/:id", async (req, res) => {
  try {
    const clientData = await Client.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(clientData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new client account
router.post("/create", async (req, res) => {
  /*
req.body should be:

{
  name: STRING,
  email: STRING,
  phone: STRING,
  password: STRING,
}

*/
  try {
    console.log(req.body);
    // create client in Db
    const newClient = await Client.create(req.body);

    // send welcome email
    await emails.sendWelcomeEmail(newClient).catch(console.error);

    res.status(200).json(newClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Client Login
router.post("/login", async (req, res) => {
  /* 
req.body should be:

{
  email: STRING,
  password: STRING
}

*/
  try {
    const dbClientData = await Client.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbClientData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbClientData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      // add client id to session
      req.session.currentClient = dbClientData.id;
      res.cookie("loggedIn", true, { maxAge: 3000000, httpOnly: true });
      res.redirect("/portal");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Client Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json("message: You have been logged out").end();
    });
  } else {
    res.status(404).end();
  }
  console.log("logged out");
});

// forgot password
router.post("/forgotPassword", async (req, res) => {
  console.log(req.body);
  try {
    const clientData = await Client.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!clientData) {
      res.status(400).json("No account found");
      return;
    }
    const client = clientData.get({ plain: true });
    const tempPW = uuidv4();

    await Client.update(
      { password: tempPW },
      { where: { id: client.id }, individualHooks: true }
    );
    //send email
    emails.sendPWResetEmail(clientData, tempPW);

    res.status(200).json("Password Reset Email Sent");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update client account info
router.put("/", async (req, res) => {
  console.log(req.body);
  try {
    await Client.update(req.body, {
      where: { id: req.session.currentClient },
      individualHooks: true,
    });

    res.status(200).json("Account Successfully Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
