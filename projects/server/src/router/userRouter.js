const express = require("express");
const router = express.Router();
const { updateCart, resetCart, getCart, getCartItems } = require('../controllers/userController1')
const {getAddressCheckout, createTransaction, deleteCartItems} = require('../controllers/userController2')
const {Payment, getUnpaid} = require('../controllers/userController3')
const {auth, multerUpload} = require('../middleware')

router.post(  "/cart",auth, updateCart);
router.patch(  "/cart",auth, resetCart);
router.post(  "/checkout",auth, createTransaction);
router.get('/unpaid', auth, getUnpaid)
router.post('/payment', auth, multerUpload.single('payment'), Payment)
router.patch(  "/cart",auth, resetCart);
router.get(  "/cart",auth, getCart);
router.get(  "/items",auth, getCartItems);
router.delete('/items', auth, deleteCartItems);
router.get(  "/address/:branch",auth, getAddressCheckout);

module.exports = router;
