const db = require("../models");
const Branch = db.Branch;
const Admin = db.Admin;
const Product = db.Product;
const Stock = db.Stock
const Stock_History = db.Stock_History;
const Transaction = db.Transaction;
const Transaction_Payment = db.Transaction_Payment;
const Transaction_Stock = db.Transaction_Stock;
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
        const { transactionId } = req.params;
        const {id} = req.account;
        await db.sequelize.transaction(async (t) => {
          // Find the transaction by its ID within the transaction
          const transaction = await Transaction.findByPk(transactionId, { transaction: t });
    
          if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
          }
    
          // Find the associated Transaction_Stock records
          const transactionStocks = await Transaction_Stock.findAll({
            where: {
              id_transaction: transactionId,
            },
            transaction: t,
          });
    
          // Revert changes made to Stock and Stock_History within the transaction
          for (const transactionStock of transactionStocks) {
            const stock = await Stock.findByPk(transactionStock.id_stock, { transaction: t });
            const stockHistoryData = {
              id_stock: transactionStock.id_stock,
              changeQty: transactionStock.qty, // Positive quantity to indicate an increase
              totalQty: stock.qty + transactionStock.qty, // Updated total quantity
              changedBy: 'Transaction Reversal',
              id_change: transaction.id,
              actor: `Admin id ${id}`
              // Add other relevant information to the stock history record
            };
    
            // Create a new Stock_History record to record the reversal within the transaction
            await Stock_History.create(stockHistoryData, { transaction: t });
    
            // Increase the stock quantity within the transaction
            await Stock.update(
              {
                qty: stock.qty + transactionStock.qty,
              },
              {
                where: {
                  id: transactionStock.id_stock,
                },
                transaction: t,
              }
            );
          }
    
          // Update the id_status to 6 within the transaction
          await Transaction.update(
            { id_status: 6 },
            {
              where: {
                id: transactionId,
              },
              transaction: t,
            });
        });
    
        return res.status(200).json({ message: 'Transaction reversed successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
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