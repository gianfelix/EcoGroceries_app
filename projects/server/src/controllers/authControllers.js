const { sAuth } = require("../services");
const messages = require("../services/messages");
// const db = require("../models");
// const users = db.User;
// const users = require("../models/user"); // Assuming you have a 'users' model imported

async function register(req, res) {
  try {
    const { name, email, phone, password, referred_by } = req.body;
    const result = await sAuth.register(name, email, phone, password, referred_by);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function verify(req, res) {
  try {
    const account = req.account;
    const result = await sAuth.verify(account);
    res
      .status(result.status)
      .json(messages.response({ message: result.message }));
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await sAuth.login(email, password);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function keepLogin(req, res) {
  try {
    const account = req.account;
    const result = await sAuth.keepLogin(account);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const result = await sAuth.forgotPassword(email);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function resetPassword(req, res) {
  try {
    const account = req.account;
    const { password, confirm_password } = req.body;
    const result = await sAuth.resetPassword(
      account,
      password,
      confirm_password
    );
    res
      .status(result.status)
      .json(messages.response({ message: result.message }));
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// async function getUserById(req, res) {
//   try {
//     const User = await users.findOne({ where: { name: req.user.name } });
//     return res.status(200).json({ message: "User retrieved successfully", data: User });
//   } catch (error) {
//     return res.status(500).json({ message: "Failed to retrieve User", error: error.message });
//   }
// }

module.exports = {
  register,
  verify,
  login,
  keepLogin,
  forgotPassword,
  resetPassword,
  // getUserById, // Add the new function here
};
