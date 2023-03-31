const router = require("express").Router();
const contactRoutes = require("./contactRoutes");

router.use("/contact", contactRoutes);

module.exports = router;
