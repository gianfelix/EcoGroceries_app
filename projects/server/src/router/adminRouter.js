const router = require("express").Router();
const { adminControllers } = require('../controllers');


router.post("/login", adminControllers.loginAdmin);
router.post("/admin", adminControllers.createAdmin); 
router.get("/admin", adminControllers.getAllAdmin); 
router.patch("/activate", adminControllers.adminActive); 
router.patch("/deactivate", adminControllers.adminInActive); 
router.patch("/update/:id", adminControllers.updateAdmin); 



module.exports = router