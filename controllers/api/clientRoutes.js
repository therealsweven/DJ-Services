const router = require("express").Router();
const { Client } = require("../../models");
const { sendClientPortalLogin, sendTempPW } = require("../../utils/helpers");
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

//get all clients
router.get("/all", async (req, res) => {
  try {
    const clientsData = await Client.findAll();
    res.status(200).json(clientsData);
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
  first: STRING,
  last: STRING,
  email: STRING,
  phone: STRING,
  password: STRING,
}

*/
  try {
    const tempPW = uuidv4();
    req.body.password = tempPW;
    console.log(req.body);
    // create client in Db
    const newClient = await Client.create(req.body);
    console.log(newClient);
    // send welcome email
    await sendClientPortalLogin(req.body).catch(console.error);

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
    console.log(validPassword);
    console.log(dbClientData);
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
      res.json("login successful");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
    await sendTempPW(clientData, tempPW).catch(console.error);

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
