const router = require("express").Router();
const { auth, validation } = require("../middleware");
const { getAllTransaction, getAllTransactionByBranch, cancelTransaction, getAllStockHistory, getStockHistoryByBranch, getTransactionDetail } = require('../controllers/transactionController1')

router.get("/", getAllTransaction);
router.get('/branch', auth, getAllTransactionByBranch )
router.get('/history', auth, getAllStockHistory)
router.get('/bhistory', auth, getAllStockHistory)
router.get('/:id', auth, getTransactionDetail)


module.exports = router;
