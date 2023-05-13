const router = require("express").Router();
const { Admin } = require("../../models");

// Admin Login
router.post("/login", async (req, res) => {
  /* 
  req.body should be:
  
  {
    email: STRING,
    password: STRING
  }
  
  */
  try {
    console.log(req.body);
    const dbAdminData = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbAdminData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbAdminData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
    req.session.save(() => {
      req.session.adminLoggedIn = true;
      // add admin id to session
      req.session.Admin = dbAdminData.id;
      res.cookie("adminLoggedIn", true, { maxAge: 3000000, httpOnly: true });
      res.redirect("/AdminPortal");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Admin Logout
router.get("/logout", (req, res) => {
  console.log("hello");
  if (req.session.adminLoggedIn) {
    req.session.destroy(() => {
      res.redirect("/admin");
    });
  } else {
    res.status(404).end();
  }
  console.log("logged out");
});

module.exports = router;
