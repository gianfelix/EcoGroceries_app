const auth = require("./auth");
const validation = require("./validation");
const uploadFile = require("./uploadFile");
const {multerUpload} = require("./multer");

module.exports = {
  auth,
  validation,
  uploadFile,
  multerUpload,
};
