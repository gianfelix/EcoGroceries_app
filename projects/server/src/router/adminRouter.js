const router = require("express").Router();
// const { adminControllers } = require('../controllers');
const { auth, validation } = require("../middleware");
const { login, getAdminAllTransaction } = require('../controllers/adminController1');



router.post("/login", login);
router.get("/all",auth, getAdminAllTransaction);
// router.get("/logout", auth, validation, login);
// router.post("/admin", validation, adminControllers.createAdmin); // ini untuk create cashier
// router.get("/admin", adminControllers.getAllAdmin); // ini untuk get all cashier
// router.get("/admin/profile", verifyToken, adminControllers.getAdminLogin); // ini untuk get 1 cashier
// router.patch("/admin/activate", adminControllers.adminActive); // ini untuk delete cashier
// router.patch("/admin/deactivate", adminControllers.adminInActive); // ini untuk deactive cashier
// router.patch("/admin/:id", adminControllers.updateAdmin); // ini untuk update cashier



module.exports = router