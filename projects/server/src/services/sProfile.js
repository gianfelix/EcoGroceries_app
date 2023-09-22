const fs = require("fs");
const path = require("path");
const db = require("../models");
const messages = require("../services/messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = db.User;
const { sendMail } = require("../helpers/transporter");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const SUBJECT_CHANGES = "Notification Changes";
const JWT_KEY = process.env.JWT_KEY;
// const BASE_REDIRECT = "http://localhost:3000";

async function getAccount(id) {
  return await users.findOne({ where: { id } });
}

async function getUser(account) {
  const { id } = account;
  const result = await getAccount(id);
  return messages.success("", result);
}

async function setName(account, name) {
  const { id } = account;

  const isExist = await users.findOne({ where: { name } });
  if (isExist) return messages.errorServer("Name has been used");
  account = await getAccount(id);

  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { name },
      { where: { id }, transaction: t }
    );
    const content = {
      name,
      context: "name",
    };
    await sendMail(account["email"], SUBJECT_CHANGES, content);
    return messages.success("Name has been changed");
  });
}

async function setEmail(account, email) {
  const { id } = account;

  const isExist = await users.findOne({ where: { email } });
  if (isExist) return messages.errorServer("Email has been used");
  account = getAccount(id);

  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { email, is_verified: false },
      { where: { id }, transaction: t }
    );
    const payload = { id };
    const token = jwt.sign(payload, JWT_KEY, {
      expiresIn: "24h",
    });
    const content = {
      name: account["name"],
      context: "email",
    };
    await sendMail(email, SUBJECT_CHANGES, content);
    return messages.success("Email has been changed");
  });
}

async function setPhone(account, phone) {
  const { id } = account;

  const isExist = await users.findOne({ where: { phone } });
  if (isExist) return messages.errorServer("Phone has been used");
  account = await getAccount(id);

  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { phone },
      { where: { id }, transaction: t }
    );
    const content = {
      name: account["name"],
      context: "phone",
    };
    await sendMail(account["email"], SUBJECT_CHANGES, content);
    return messages.success("Phone has been changed");
  });
}

async function setPassword(account, old_password, password, confirm_password) {
  const { id } = account;
  account = await getAccount(id);
  const compared = await bcrypt.compare(old_password, account["password"]);

  if (!compared) return messages.errorClient("Wrong password");
  if (password !== confirm_password)
    return messages.errorClient("Password must be same");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { password: hashPassword },
      { where: { id }, transaction: t }
    );
    return messages.success("Password has been changed");
  });
}

async function setAvatar(account, file) {
  const { id } = account;
  const { path } = file;
  const oldAvatar = await users.findOne({ where: { id } });
  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { avatar: path },
      { where: { id }, transaction: t }
    );

    if (oldAvatar["avatar"]) await fs.promises.unlink(oldAvatar["avatar"]);

    return messages.success("Profile image has been changed");
  });
}

async function setGender(account, gender) {
  const { id } = account;

  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { gender },
      { where: { id }, transaction: t }
    );
    return messages.success("Gender has been updated");
  });
}

async function setBirthdate(account, birthday) {
  const { id } = account;

  return await db.sequelize.transaction(async function (t) {
    const result = await users.update(
      { birthday },
      { where: { id }, transaction: t }
    );
    return messages.success("Birthdate has been updated");
  });
}

module.exports = {
  getUser,
  setName,
  setEmail,
  setPhone,
  setPassword,
  setAvatar,
  setGender,
  setBirthdate,
};

