const router = require("express").Router();
const { profileControllers } = require("../controllers");
const { auth, validation, uploadFile } = require("../middleware");

router.get("/", auth, profileControllers.getUser);
router.patch("/name", auth, validation.vName, validation.vResult, profileControllers.setName);
router.patch("/email", auth, validation.vEmail, validation.vResult, profileControllers.setEmail);
router.patch("/phone", auth, validation.vPhone, validation.vResult, profileControllers.setPhone);
router.patch("/password", auth, validation.vChangePasswordFields, validation.vResult, profileControllers.setPassword);
router.patch("/avatar", auth, uploadFile.single("avatar"), profileControllers.setAvatar);
router.patch("/gender", auth, validation.vGender, validation.vResult, profileControllers.setGender);
router.patch("/birthday", auth, validation.vBirthdate, validation.vResult, profileControllers.setBirthdate);


module.exports = router;
