const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const users = db.User;
const admins = db.Admin;
const carts = db.Cart;

 async function userLogin (req, res)  {
    try {
      const { username, password } = req.body;
      const userData = await users.findOne({ 
        where: { name: username },
        include: [{
          model: carts,
          attributes: ['id'], 
        }],
      });
  const cartId = userData.Cart.id;
  
      if (!userData) {
        return res.status(404).json({
          error: "Login failed",
          message: "User not found",
        });
      }

      const validatePassword = await bcrypt.compare(password, userData.password);
  
      if (!validatePassword) {
        return res.status(400).json({
          error: "Login failed",
          message: "Invalid password",
        });
      }
  
      let payload = {
        id: userData.id,
        cartId: cartId
      };
  
      const token = jwt.sign(payload, process.env.JWT_KEY);
  
     
        return res.status(200).json({
          success: "Login succeed",
          data: {
            id: userData.id,
            username: userData.username,
            cart: cartId,
            token,
          },
        })
      
    } catch (err) {
        console.error(err)
      return res.status(500).json({
        error: "Login failed",
        message: err.message,
      });
    }
  }

  async function adminLogin (req, res)  {
    try {
      const { username, password } = req.body;
      const userData = await admins.findOne({ 
        where: { name: username },
        include: [{
          model: carts,
          attributes: ['id'], 
        }],
      });
  const cartId = userData.Cart.id;
  
      if (!userData) {
        return res.status(404).json({
          error: "Login failed",
          message: "User not found",
        });
      }

      const validatePassword = await bcrypt.compare(password, userData.password);
  
      if (!validatePassword) {
        return res.status(400).json({
          error: "Login failed",
          message: "Invalid password",
        });
      }
  
      let payload = {
        id: userData.id,
        cartId: cartId
      };
  
      const token = jwt.sign(payload, process.env.JWT_KEY);
  
     
        return res.status(200).json({
          success: "Login succeed",
          data: {
            id: userData.id,
            username: userData.username,
            cart: cartId,
            token,
          },
        })
      
    } catch (err) {
        console.error(err)
      return res.status(500).json({
        error: "Login failed",
        message: err.message,
      });
    }
  }
  
  async function createUser  (req, res) {
    try {
      const { username, email, password } = req.body;
      const foundUser = await users.findOne({ where: { username: username } });
      const foundEmail = await users.findOne({ where: { email: email } });
  
      if (foundUser || foundEmail) {
        return res.status(400).json({
          error: "Registration failed",
          message: "User exists",
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const userData = await db.sequelize.transaction(async (t) => {
        const newUser = await users.create(
          {
            username,
            email,
            password: hashPassword,
          },
          { transaction: t }
        );
  
        const cartData = await carts.create(
          {
            userId: newUser.id,
          },
          { transaction: t }
        );
  
        return newUser;
      });
  
      return res.status(200).json({
        success: "Registration succeed",
        user: userData,
      });
    } catch (err) {
        console.error(err)
      return res.status(500).json({
        error: "Registration failed",
        message: err.message,
      });
    }
  }
  
  module.exports = {userLogin, createUser}