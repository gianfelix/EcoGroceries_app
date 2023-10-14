const authRouter = require("./authRouter");
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
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')


module.exports = {
  authRouter,
  profileRouter,
  rajaongkirRouter,
  addressRouter,
  productRouter,
  //   cashierRouter,
  categoriesRouter,
  //   cartRouter,
  //   reportRouter,
  userRouter,
  stockRouter,
  stockPromoRouter,
  vouchersRouter,
  transactionRouter,
  adminRouter,
};
