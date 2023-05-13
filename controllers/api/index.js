const router = require("express").Router();
const inquiryRoutes = require("./inquiryRoutes");
const clientRoutes = require("./clientRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/inquiries", inquiryRoutes);
router.use("/client", clientRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
