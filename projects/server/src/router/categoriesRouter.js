const router = require("express").Router();

const { categoriesController } = require("../controllers");


router.post("/", categoriesController.createCategory);
router.patch("/", categoriesController.updateCategory);

router.patch("/deactivate", categoriesController.deactivateCategory);
router.patch("/activate", categoriesController.activateCategory);

router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategoryById);


module.exports = router;