const path = require("path");
const { sendMail } = require("../helpers/transporter");
const messages = require("./messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});

const db = require("../models");
const { Op } = require("sequelize");
const users = db.User;
const carts = db.Cart;
const JWT_KEY = process.env.JWT_KEY;
const VERIFY_MESSAGE = "Please check your email to verify your account";
const BASE_REDIRECT = "http://localhost:3000";

async function hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function isExist(name, email, phone, referred_by ) {
    const checkAccount = await users.findAll({
        where: {
            [Op.or]: [{ name }, { email }, { phone }, { referred_by }],
        },
    });
    if (checkAccount.length === 0) return false;
    if (
        checkAccount.length === 1 &&
        checkAccount[0]["email"] === email &&
        !checkAccount[0]["isVerified"]
    )
        return checkAccount[0];
    return true;
}

async function updateRegistration(id, name, phone, password, referred_by) {
    return await db.sequelize.transaction(async function (t) {
        return await users.update(
            { name, phone, password, referred_by },
            { where: { id }, transaction: t }
        );
    });
}

function generateReferralCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = 'ECO-';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
  async function createAccount(name, email, phone, password, referred_by) {
    const referralCode = generateReferralCode();

    try {
        let referringUser = null;

        if (referred_by) {
            referringUser = await db.User.findOne({
                where: { referral: referred_by },
            });

            if (!referringUser) {
                return { success: false, error: 'Referring user not found' };
            }
        }

        const result = await db.sequelize.transaction(async (t) => {
            const createdUser = await users.create(
                {
                    name,
                    email,
                    phone,
                    password,
                    referral: referralCode,
                    referred_by: referringUser ? referringUser.id : null,
                },
                { transaction: t }
            );

            // Assuming you have a 'carts' model and an association like 'user.hasOne(cart)'
            // You can create a cart associated with the user here.
            const cart = await createdUser.createCart({}, { transaction: t });

            return { success: true, user: createdUser, cart };
        });

        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'User creation failed' };
    }
}


async function getAccount(id) {
    return await users.findOne({ where: { id } });
}

async function register(name, email, phone, password, referred_by) {
      if (!name || !email || !phone || !password)
        return messages.errorClient("Please fill all the data");

    const account = await isExist(name, email, phone, referred_by);
    if (account === true) return messages.errorServer("Account already exist");
    const hashPassword = await hashPass(password);

    let result;
    if (account)
        result = await updateRegistration(
            account["id"],
            name,
            phone,
            hashPassword,
            referred_by
        );
    else result = await createAccount(name, email, phone, hashPassword, referred_by);

    const payload = { id: account ? account["id"] : result.user["id"] };
    const token = jwt.sign(payload, JWT_KEY, {
        expiresIn: "24h",
    });

    const content = {
        name: account ? account["name"] : result.user["name"],
        context: "VERIFY",
        redirect: `${BASE_REDIRECT}/verify/${token}`,
    };
    await sendMail(
        account ? account["email"] : result.user["email"],
        "Verify Your Account",
        content
    );

    return messages.success(VERIFY_MESSAGE);
}

async function verify(account) {
    const checkVerified = await users.findOne({where:{id:account["id"]}});
    if(checkVerified["isVerified"]) return messages.errorServer("Your account already verified");
    const result = await users.update(
        { isVerified: true },
        { where: { id: account["id"] } }
    );
    return messages.success("Your account has been verified", result);
}

async function login(email, password) {
    const account = await users.findOne({
        where: { email:email},
        include: [{
            model: carts,
            attributes: ['id'], 
          }],
    });
    if (!account) return messages.errorClient("Account not found");
    const cartId = account.Cart.id;
    const compared = await bcrypt.compare(password, account["password"]);
    if (!compared) return messages.errorClient("Invalid name or password");
    const payload = { id: account["id"], isVerified:true, cartId: cartId };
    const token = jwt.sign(payload, JWT_KEY, {
        expiresIn: "7d",
    });

    return messages.success("Login Success", { token });
}

async function keepLogin(account) {
    const payload = { id: account["id"] };
    const token = jwt.sign(payload, JWT_KEY, {
        expiresIn: "7d",
    });
    return messages.success("Token has been updated", { token });
}

async function forgotPassword(email) {
    const account = await users.findOne({
        where: { email },
    });
    if (!account) return messages.errorServer("Account not exist");

    const payload = { id: account["id"] };
    const token = jwt.sign(payload, JWT_KEY, {
        expiresIn: "4h",
    });

    const content = {
        name: account["name"],
        context: "RESET PASSWORD",
        redirect: `${BASE_REDIRECT}/reset-password/${token}`,
    };
    await sendMail(email, "Reset Your Password", content);
    return messages.success(
        "Please check your email to reset your password, expired in 4 hours"
    );
}

async function resetPassword(account, password, confirm_password) {
    if (password !== confirm_password)
        return messages.errorClient("Password must be same");
    const id = account["id"];
    account = await getAccount(id);
    const hashPassword = await hashPass(password);
    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { password: hashPassword },
            { where: { id }, transaction: t }
        );
        const content = {
            name: account["name"],
            context: "Password",
        };
        await sendMail(account["email"], "Notification Data Change", content);
        return messages.success("Password has been reseted", result);
    });
}

module.exports = {
    register,
    verify,
    login,
    keepLogin,
    forgotPassword,
    resetPassword,
};
