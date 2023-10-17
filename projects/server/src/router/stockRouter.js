const router = require("express").Router();
const { stockControllers } = require("../controllers");
const {auth} = require('../middleware')

router.post("/", stockControllers.createStock);
router.patch("/", stockControllers.updateAndRetrieveStock);
router.patch("/add", stockControllers.addStockProduct);
router.patch("/reduce", stockControllers.reduceStockProduct);
router.post("/branch", stockControllers.getAllStock);
router.get("/", stockControllers.getAllStock);
router.get("/:id", auth, stockControllers.getStockById);
router.patch("/deactivate-stock/:id", stockControllers.deactivateStock);
router.patch("/activate-stock/:id", stockControllers.activateStock);

module.exports = router;
