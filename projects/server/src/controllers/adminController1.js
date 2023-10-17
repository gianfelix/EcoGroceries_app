const db = require("../models");
const Branch = db.Branch;
const Admin = db.Admin;
const Product = db.Product;
const Stock = db.stockl
const Stock_History = db.Stock_History;
const Transaction = db.Transaction;
const Transaction_Payment = db.Transaction_Payment;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken= (admin) => {
    const payload= {
        id: admin.id,
       isSuper: admin.adminSuper,
       branch: admin.id_branch
    };
    // const options = {
    //     expiresIn: "24h",
    // }
    return jwt.sign(payload, process.env.JWT_KEY);
}

async function login (req, res) {
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
             res.status(200).json({ message: "Login success:", token, role: checkLogin.adminSuper, branch: checkLogin.id_branch });
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}


async function confirmPayment (req, res) {
    try {
        const {id} = req.params;
        const transaction = await Transaction.update({id_status: 3}, {
            where: {
                id: id
            }
        })
        res.status(200).json({message: 'payment confirmed'})
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

async function cancelPayment (req, res) {
    try {
        const {id} = req.params;
        const transaction = await Transaction.update({id_status: 6}, {
            where: {
                id: id
            }
        })
        res.status(200).json({message: 'payment cancelled'})
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

async function sendOrder (req, res) {
    try {
        const {id} = req.params;
        const transaction = await Transaction.update({id_status: 4}, {
            where: {
                id: id
            }
        })
        res.status(200).json({message: 'order sent'})
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

module.exports = {login, sendOrder, cancelPayment, confirmPayment}