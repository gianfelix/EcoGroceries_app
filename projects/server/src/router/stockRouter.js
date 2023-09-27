const router = require("express").Router();
const { stockControllers } = require("../controllers");

router.post("/", stockControllers.createStock);
router.patch("/", stockControllers.updateAndRetrieveStock);
router.patch("/add", stockControllers.addStockProduct);
router.patch("/reduce", stockControllers.reduceStockProduct);
router.get("/", stockControllers.getAllStock);
router.patch("/deactivate-stock/:id", stockControllers.deactivateStock);
router.patch("/activate-stock/:id", stockControllers.activateStock);

module.exports = router;
