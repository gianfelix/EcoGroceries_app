const authControllers = require('./authControllers');
const adminControllers = require('./adminControllers');
const profileControllers = require('./profileControllers');
const rajaOngkirControllers = require('./rajaOngkirControllers');
const userAddressControllers = require('./userAddressControllers');
const productControllers = require('./productControllers');
// const cashierControllers = require('./cashierControllers');
const categoriesController = require('./categoriesController');
// const cartController = require('./cartController');
// const reportControllers = require('./reportControllers');
const stockControllers = require('./stockControllers');
const stockPromoControllers = require('./stockPromoControllers');
const vouchersControllers = require('./vouchersControllers');
const transactionControllers = require('./transactionControllers');

module.exports = {
  authControllers,
  adminControllers,
  profileControllers,
  rajaOngkirControllers,
  userAddressControllers,
  productControllers,
  categoriesController,
  // cartController,
  // cashierControllers,
  // reportControllers,
  stockControllers,
  stockPromoControllers,
  vouchersControllers,
  transactionControllers,
};
