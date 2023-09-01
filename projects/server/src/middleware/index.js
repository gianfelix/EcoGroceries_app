const { verifyToken } = require("./auth");
const { multerUpload } = require("./multer");
const {
  validateLogin,
  validateRegister,
  validateChangeUsername,
  validateChangeEmail,
  //   validateChangePassword,
  validateResetPassword,
  validateForgotPassword,
  validate,
} = require("./validation");

module.exports = {
  verifyToken,
  validateLogin,
  validateRegister,
  validateChangeUsername,
  validateChangeEmail,
  //   validateChangePassword,
  validateResetPassword,
  validateForgotPassword,
  validate,
  multerUpload,
};
