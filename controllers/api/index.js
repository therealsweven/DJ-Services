const router = require("express").Router();
const inquiryRoutes = require("./inquiryRoutes");

router.use("/inquiries", inquiryRoutes);

module.exports = router;
