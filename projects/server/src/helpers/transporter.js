const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user_gmail,
    pass: process.env.pass_gmail,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
