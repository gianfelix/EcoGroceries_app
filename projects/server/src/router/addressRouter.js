const router = require("express").Router();
const { userAddressControllers } = require("../controllers");
const { auth } = require("../middleware");

router.post("/", auth, userAddressControllers.createUserAddress);
router.get("/", auth, userAddressControllers.getUserAddress)
router.get("/:id", auth, userAddressControllers.getUserAddressById);
router.patch("/:id", auth, userAddressControllers.updateUserAddress);
router.delete("/:id", auth, userAddressControllers.deleteUserAddress);
router.patch("/default/:id", auth, userAddressControllers.setDefault);

module.exports = router;