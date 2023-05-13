const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const clientPortalRoutes = require("./clientPortalRoutes");
const api = require("./api");

router.use("/", homeRoutes);
router.use("/ClientPortal", clientPortalRoutes);
router.use("/api", api);

module.exports = router;
