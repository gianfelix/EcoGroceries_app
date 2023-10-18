const express = require("express");
const router = express.Router();
const { updateCart, resetCart, getCart, getCartItems } = require('../controllers/userController1')
const {getAddressCheckout, createTransaction, } = require('../controllers/userController2')
const {Payment, getUnpaid, deleteCartItem, getAllUserTransactions, getUserTransactionsById, cancelOrder } = require('../controllers/userController3')
const {auth, multerUpload} = require('../middleware')


router.post(  "/cart",auth, updateCart);
router.patch(  "/cart",auth, resetCart);
router.post(  "/checkout",auth, createTransaction);
router.get('/unpaid', auth, getUnpaid)
router.post('/payment', auth, multerUpload.single('payment'), Payment)
router.patch(  "/cart",auth, resetCart);
router.get(  "/cart",auth, getCart);
router.get(  "/items",auth, getCartItems);
router.get(  "/address/:branch",auth, getAddressCheckout);
router.get('/transaction', auth, getAllUserTransactions)
router.patch("/cancel/:transactionId",auth, cancelOrder);
router.delete( "/clean/:id_stock",auth, deleteCartItem);
router.get('/transaction/:trId', auth, getUserTransactionsById)

module.exports = router;
