const router = require("express").Router();
const { auth, validation } = require("../middleware");
const { getAllTransaction, getAllTransactionByBranch } = require('../controllers/transactionController1')

router.get("/", getAllTransaction);
router.get('/branch', auth, getAllTransactionByBranch )

module.exports = router;
