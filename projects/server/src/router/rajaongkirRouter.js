const router = require("express").Router();
const { rajaOngkirControllers } = require("../controllers");

router.get("/city", rajaOngkirControllers.getCity);
router.get("/province", rajaOngkirControllers.getProvince);
router.post("/cost", rajaOngkirControllers.getCost);
router.get("/citybyprovince", rajaOngkirControllers.getCityByProvince);

module.exports = router;