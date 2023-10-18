const db = require('../models')
const fs = require("fs");
const path = require("path");
const Transaction = db.Transaction;
const Transaction_Stock = db.Transaction_Stock;
const Transaction_Status = db.Transaction_Status;
const Stock_History = db.Stock_History;
const Product = db.Product;
const Category = db.Category;
const Stock = db.Stock;
const Cart = db.Cart;
const Cart_Stock = db.Cart_Stock;
const Stock_Promos = db.Stock_Promos;
const Address = db.User_Address
const Branch = db.Branch;
const Transaction_Payment = db.Transaction_Payment;


async function Payment (req, res) {
    try {
        console.log('req',req.file)
        // const {id} = req.account;
        const trId = req.body.trId;
        console.log('id',trId)
        const paid = await Transaction.update({id_status: 2},{where: {
            id: trId
        }})
        const upload = await Transaction_Payment.create({
            id_transaction: trId,
            paymentProof: req.file.path
        })
        res.status(200).json(trId)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

async function getUnpaid (req, res) {
    try {
        console.log(req.account)
       const {id} = req.account;
       const unpaid = await Transaction.findOne({
        where: {
            id_user: id,
            id_status: 1}
    }) 
    res.status(200).json(unpaid)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

async function confirmOrder (req, res) {
    try {
        const {id} = req.params;
        const transaction = await Transaction.update({id_status: 5}, {
            where: {
                id: id,
            }
        })
        res.status(200).json({message: 'order confirmed'})
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

async function deleteCartItem(req, res) {
    const { cartId } = req.account;
    const { id_stock } = req.params;
    console.log('cartId:', cartId);
    console.log('id_stock:', id_stock);
    try {
        await db.sequelize.transaction(async (t) => {
            const del = await Cart_Stock.findByPk(id_stock)
            console.log(del)
            if (del) {await del.destroy({transaction: t})
        
            res.status(200).json({ message: 'Cart item deleted' });
        }  else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function getAllUserTransactions (req, res) {
    try {
        const {id} = req.account
        const transactions = await Transaction.findAll({
            where: {
                id_user: id
            },
            include: [{
                model: Transaction_Stock,
                attitbutes: ['productName', 'productImg', 'qty', 'price'],
                // limit: 1
            },
            {
                model: Transaction_Status,
                attributes: ['id','status']
            }
        ]
        })
        res.status(200).json(transactions)
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

async function getUserTransactionsById (req, res) {
    try {
        const {id} = req.account;
        const {trId} = req.params;
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

async function cancelOrder (req, res) {
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
              changedBy: 'Order Cancellation',
              id_change: transaction.id,
              actor: `User id ${id}`
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

          await Transaction.update(
            { id_status: 6 },
            {
              where: {
                id: transactionId,
              },
              transaction: t,
            });
        });
    
        return res.status(200).json({ message: 'Order cancelled successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {Payment, getUnpaid, confirmOrder, deleteCartItem, getAllUserTransactions, getUserTransactionsById, cancelOrder}