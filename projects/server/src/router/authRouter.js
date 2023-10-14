const router = require("express").Router();
const { authControllers } = require('../controllers');
const { auth, validation } = require("../middleware");

router.post("/register", validation.vRegistrationFields, validation.vResult, authControllers.register);
// router.get("/user/:id", authControllers.getUserById);
router.patch("/verify", auth, authControllers.verify);
router.post("/login", validation.vLoginFields, validation.vResult, authControllers.login);
router.get("/login", auth, authControllers.keepLogin);
router.post("/forgot", authControllers.forgotPassword);
router.patch("/reset", auth, validation.vResetPasswordFields, validation.vResult,authControllers.resetPassword);

module.exports = router;
