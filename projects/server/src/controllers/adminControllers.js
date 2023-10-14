const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const Admin = db.Admin;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Op } = require("sequelize");

const generateToken = (admin) => {
    const payload = {
        id: admin.id,
        adminSuper: admin.adminSuper // Use adminSuper for role
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
                where: { email },
            });
            if (!checkLogin) {
                return res.status(400).json({ message: "User not found" });
            }
            if (!checkLogin.isActive) {
                return res.status(400).json({ message: "Admin is inactive and cannot log in" });
            }
            const comparePassword = await bcrypt.compare(password, checkLogin.password);
            if (!comparePassword) {
                return res.status(400).json({ message: "Wrong password" });
            }
            const token = generateToken(checkLogin);
            return res.status(200).json({ message: "Login success:", token, role: checkLogin.id_branch });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    

    createAdmin: async (req, res) => {
        try {
            const { id_branch, user_name, email, password } = req.body;
            const existingAdmin = await Admin.findOne({
                where: { [Op.or]: [{ email }] },
            });
            if (existingAdmin) {
                return res.status(400).json({ message: "Admin already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createAdmin = await Admin.create({
                id_branch,
                user_name,
                email,
                password: hashedPassword,
                adminSuper: false,
                isActive: true,
            });
            return res.status(200).json(createAdmin);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    

    getAllAdmin: async (req, res) => {
        try {
            const admin = await Admin.findAll({
                where: { adminSuper: false }, // Filter by adminSuper role
            });
            return res.status(200).json(admin);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    adminActive: async (req, res) => {
        try {
            const adminId = req.query.id;
            await db.sequelize.transaction(async (t) => {
                const updateAdmin = await Admin.update(
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
            const adminId = req.query.id;
            await db.sequelize.transaction(async (t) => {
                const updateAdmin = await Admin.update(
                    { isActive: false },
                    { where: { id: adminId }, transaction: t }
                );
                res.status(200).json({ message: "Admin inactive!" });
            })
        } catch (error) {
            res.status(500).json({ message: "Error updating admin status", error: error.message })
        }
    },

    updateAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            const { currentIdbranch, currentUsername, currentEmail, newIdbranch, newUsername, newEmail } = req.body;
            if (!currentIdbranch, !currentUsername || !currentEmail || !newIdbranch || !newUsername || !newEmail) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const cashier = await Admin.findOne({
                where: { id, id_branch: currentIdbranch, user_name: currentUsername, email: currentEmail, isActive: true },
            });
            if (!cashier) {
                return res.status(400).json({ message: "Cashier not found" });
            }
            cashier.id_branch = newIdbranch;
            cashier.user_name = newUsername;
            cashier.email = newEmail;
            await cashier.save();
            return res.status(200).json({ message: "Cashier updated" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
};

module.exports = adminController;
