const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const Admin = db.Admin;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Op } = require("sequelize");




const generateToken= (admin) => {
    const payload= {
        id: admin.id,
        role: admin.role
    };
    const options = {
        expiresIn: "24h",
    }
    return jwt.sign(payload, process.env.JWT_KEY, options);
}

const adminController = {
    loginAdmin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const checkLogin = await Admin.findOne({
               where: {email},
            });
            if (!checkLogin) {
                return res.status(400).json({ message: "User not found" });
            }
            const comparePassword = await bcrypt.compare(password, checkLogin.password);
            if (!comparePassword) {
                return res.status(400).json({ message: "Wrong password" });
            }

            const token = generateToken(checkLogin);
            return res.status(200).json({ message: "Login success:", token, role: checkLogin.role });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    createAdmin: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const existingAdmin = await Admin.findOne({
                where: { [Op.or]: [{ email }, { username }] },
            });
            if (existingAdmin) {
                return res.status(400).json({ message: "Admin already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createAdmin = await Admin.create({
                email,
                password: hashedPassword,
                adminSuper: true, // Set the role to "adminSuper" here
                isActive: true,
            });
            return res.status(200).json(createAdmin);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    getAllAdmin: async (req, res) => {
        try {
            const admin = await User.findAll({
                where: { role: "adminSuper" },
            });
            return res.status(200).json(admin);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    getAdminLogin: async (req, res) => {
        try{
            const {id} = req.admin;
            const admin = await Admin.findByPk(id)
            return res.status(200).json(admin)
        }catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    adminActive: async (req, res) => {
        try {
          const adminId = req.query.id;
    
          await db.sequelize.transaction(async (t) => {
            const updateAdmin = await User.update(
              { isActive: true },
              { where: { id: adminId }, transaction: t }
            );
    
            res.status(200).json({ message: "Admin active!" });
          });
        } catch (error) {
          res.status(500).json({ message: "Error updating admin status", error: error.message })
        }
      },
    
      adminInActive: async (req, res) => {
        try {
          const adminId = req.query.id
          await db.sequelize.transaction(async (t) => {
            const updateAdmin = await Admin.update(
              { isActive: false },
              { where: { id: adminId }, transaction: t }
            );
            res.status(200).json({ message: "admin inactive!" });
          })
        } catch (error) {
          res.status(500).json({ message: "Error updating admin status", error: error.message })
        }
      },
};

module.exports = adminController;
