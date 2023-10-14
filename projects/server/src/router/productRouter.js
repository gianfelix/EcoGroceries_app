const router = require("express").Router();

const { productControllers } = require("../controllers");
const { multerUpload } = require("../middleware");

router.get("/:id", productControllers.getProductById);
router.get("/", productControllers.getProduct);
router.post("/", multerUpload.single("productImg"), productControllers.createProduct);
router.patch("/:id", multerUpload.single("productImg"), productControllers.updateProduct);
router.patch("/:id/deactivate", productControllers.deactivateProduct);
router.patch("/:id/activate", productControllers.activateProduct);

module.exports = router;
