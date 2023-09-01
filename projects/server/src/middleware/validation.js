const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("username")
    .if(body("username").exists())
    .exists()
    .notEmpty()
    .withMessage("Username is required"),
  body("email")
    .if(body("email").exists())
    .exists()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("phone")
    .if(body("phone").exists())
    .exists()
    .notEmpty()
    .withMessage("Phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRegister = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("phone")
    .if(body("phone").exists())
    .exists()
    .withMessage("Phone is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/)
    .withMessage(
      "Password must be at least 6 characters, 1 symbol, and 1 uppercase"
    ),
];

const validateForgotPassword = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

const validateResetPassword = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/)
    .withMessage(
      "Password must be at least 6 characters, 1 symbol, and 1 uppercase"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
];

const validateChangeUsername = [
  body("newUsername").notEmpty().withMessage("New username is required"),
];

const validateChangeEmail = [
  body("newEmail")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

const validate = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) return res.status(400).json({ message: errors });

  next();
};

module.exports = {
  validateLogin,
  validateRegister,
  validateForgotPassword,
  validateResetPassword,
  validateChangeUsername,
  validateChangeEmail,
  validate,
};
