const fs = require("fs");
const { sProfile } = require("../services");
const messages = require("../services/messages");
// const TRY_AGAIN = { message: "Please try again" };

async function getUser(req, res) {
    try {
        const account = req.account;
        const result = await sProfile.getUser(account);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function setName(req, res) {
    try {
        const account = req.account;
        const { name } = req.body;
        const result = await sProfile.setName(account, name);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function setEmail(req, res) {
    try {
        const account = req.account;
        const { email } = req.body;
        const result = await sProfile.setEmail(account, email);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function setPhone(req, res) {
    try {
        const account = req.account;
        const { phone } = req.body;
        const result = await sProfile.setPhone(account, phone);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function setPassword(req, res) {
    try {
        const account = req.account;
        const { old_password, password, confirm_password } = req.body;
        const result = await sProfile.setPassword(
            account,
            old_password,
            password,
            confirm_password
        );
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function setAvatar(req, res) {
    const file = req.file;
    try {
        const account = req.account;
        const result = await sProfile.setAvatar(account, file);
        res.status(200).json(result);
    } catch (error) {
        await fs.promises.unlink(file.path);
        res.status(500).json(error.message);
    }
}

async function setGender(req, res) {
    try {
      const account = req.account;
      const { gender } = req.body;
      const result = await sProfile.setGender(account, gender);
      res.status(result.status).json(messages.response(result));
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  
async function setBirthdate(req, res) {
    try {
      const account = req.account;
      const { birthday } = req.body;
      const result = await sProfile.setBirthdate(account, birthday);
      res.status(result.status).json(messages.response(result));
    } catch (error) {
      res.status(500).json(error.message);
    }
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
  
