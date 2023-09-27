const router = require("express").Router();
const { transactionControllers } = require("../controllers");

router.get("/", transactionControllers.getAllTransaction);

module.exports = router;
