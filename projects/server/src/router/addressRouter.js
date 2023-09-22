const router = require("express").Router();
const { userAddressControllers } = require("../controllers");
const { auth } = require("../middleware");

router.post("/", auth, userAddressControllers.createUserAddress);
router.get("/", auth, userAddressControllers.getUserAddress)
router.get("/:id", auth, userAddressControllers.getUserAddressById);
router.patch("/", auth, userAddressControllers.updateUserAddress);
router.delete("/", auth, userAddressControllers.deleteUserAddress);
router.post("/default", userAddressControllers.setDefault);

module.exports = router;