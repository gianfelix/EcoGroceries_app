const router = require("express").Router();
const { vouchersControllers } = require("../controllers");

router.post("/", vouchersControllers.createVoucher);
router.patch("/:id", vouchersControllers.updateVoucher);
router.get("/", vouchersControllers.getAllVouchers);

module.exports = router;
