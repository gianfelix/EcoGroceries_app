const { body, validationResult } = require("express-validator");
const messages = require("../services/messages");

const vName = body("name")
    .notEmpty()
    .withMessage("name is empty")
    .bail()
    .isLength({ min: 5 })
    .withMessage("name length min 8");

const vEmail = body("email")
    .notEmpty()
    .withMessage("Email is empty")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Email is not valid");

const vPassword = body("password").notEmpty().withMessage("Password is empty");
const vOldPassword = body("old_password").notEmpty().withMessage("Old password is empty");

const vSetPassword = vPassword
    .bail()
    .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    .withMessage(
        "Password length min 8, uppercase min 1, number min 1, symbol min 1"
    );

const vConfirmPassword = body("confirm_password")
    .notEmpty()
    .withMessage("Confirm Password is empty");

const vPhone = body("phone")
    .notEmpty()
    .withMessage("Phone is Empty")
    .bail()
    .isMobilePhone()
    .withMessage("Invalid phone number");

const vReferralBy = body("referred_by")
    .optional()
    // .isAlphanumeric()
    // .withMessage("Referral code must be alphanumeric");

const email = body("email").notEmpty().withMessage("email is empty");

const vGender = body("gender")
    .optional()
    .isBoolean()
    .withMessage("Invalid gender");

const vBirthdate = body("birthdate")
    .optional()
    .isDate()
    .withMessage("Invalid birthdate");

const vRegistrationFields = [vEmail, vName, vPhone, vSetPassword, vReferralBy];

const vLoginFields = [email, vPassword];

const vResetPasswordFields = [vSetPassword, vConfirmPassword];

const vChangePasswordFields = [
    vOldPassword,
    ...vResetPasswordFields
]

const vProfileUpdateFields = [vName, vEmail, vPhone, vGender, vBirthdate];

function vResult(req, res, next) {
    const { errors } = validationResult(req);
    if (errors.length > 0)
        return res.status(400).json(
            messages.response({
                message: "Invalid input",
                data: errors.map((error) => error["msg"]),
            })
        );
    next();
}

module.exports = {
    vName,
    vEmail,
    vPhone,
    vRegistrationFields,
    vLoginFields,
    vResetPasswordFields,
    vChangePasswordFields,
    vResult,
    vReferralBy,
    vGender,
    vBirthdate,
    vProfileUpdateFields,
};
