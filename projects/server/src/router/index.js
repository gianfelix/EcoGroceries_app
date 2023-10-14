const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const profileRouter = require("./profileRouter");
const rajaongkirRouter = require("./rajaongkirRouter");
const addressRouter = require("./addressRouter");
const productRouter = require("./productRouter");
// const cashierRouter = require("./cashierRouter");
const categoriesRouter = require("./categoriesRouter");
// const cartRouter = require("./cartRouter");
// const reportRouter = require("./reportRouter");
const stockRouter = require("./stockRouter");
const stockPromoRouter = require("./stockPromoRouter");
const vouchersRouter = require("./vouchersRouter");
const transactionRouter = require("./transactionRouter");

module.exports = {
  authRouter,
  adminRouter,
  profileRouter,
  rajaongkirRouter,
  addressRouter,
  productRouter,
  //   cashierRouter,
  categoriesRouter,
  //   cartRouter,
  //   reportRouter,
  stockRouter,
  stockPromoRouter,
  vouchersRouter,
  transactionRouter,
};
