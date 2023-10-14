const router = require("express").Router();
const { transactionControllers } = require("../controllers");
const { auth, validation } = require("../middleware");
const { getTransactionById, getTransactionDetail, cancelTransaction } = require('../controllers/transactionController1')

router.get('/detail/:id',auth, getTransactionDetail)
router.patch('/cancel/:id', auth, cancelTransaction)
router.get("/:id",auth, getTransactionById);

module.exports = router;
