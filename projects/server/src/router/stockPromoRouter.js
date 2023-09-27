const router = require("express").Router();
const { stockPromoControllers } = require("../controllers");

router.post("/", stockPromoControllers.createStockPromo);
router.patch("/:id", stockPromoControllers.updateStockPromo);
router.get("/", stockPromoControllers.getAllStockPromo);
router.patch(
  "/activate-stock-promo/:id",
  stockPromoControllers.activateStockPromo
);
router.patch(
  "/deactivate-stock-promo/:id",
  stockPromoControllers.deactivateStockPromo
);

module.exports = router;
