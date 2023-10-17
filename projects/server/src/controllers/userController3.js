const db = require('../models')
const fs = require("fs");
const path = require("path");
const Transaction = db.Transaction;
const Transaction_Stock = db.Transaction_Stock;
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
                id: id
            }
        })
        res.status(200).json({message: 'order confirmed'})
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

module.exports = {Payment, getUnpaid, confirmOrder}