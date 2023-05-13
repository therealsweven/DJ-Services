const router = require("express").Router();
const inquiryRoutes = require("./inquiryRoutes");
const clientRoutes = require("./clientRoutes");
const adminRoutes = require("./adminRoutes");
const invoiceRoutes = require("./invoiceRoutes");

router.use("/inquiries", inquiryRoutes);
router.use("/client", clientRoutes);
router.use("/admin", adminRoutes);
router.use("/invoice", invoiceRoutes);

module.exports = router;
