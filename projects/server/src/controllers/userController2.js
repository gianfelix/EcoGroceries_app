const db = require('../models')
const { Op } = require("sequelize");
const Transaction = db.Transaction;
const Transaction_Stock = db.Transaction_Stock;
const Product = db.Product;
const Category = db.Category;
const Stock = db.Stock;
const Cart = db.Cart;
const Cart_Stock = db.Cart_Stock;
const Stock_Promos = db.Stock_Promos;
const Address = db.User_Address
const Branch = db.Branch
const Stock_History = db.Stock_History;

async function deleteCartItems (req,res) {
    const { id_stock } = req.body;
    const {id_cart} = req.account;
  
    try {
      await db.sequelize.transaction(async (t) => {
        const existingItem = await Cart_Stock.findOne({ where: { id_cart, id_stock } });
  
        if (existingItem) {
          await existingItem.destroy({ transaction: t });
  
          return res.status(200).json({ message: 'Item deleted from cart successfully' });
        } else {
          return res.status(404).json({ message: 'Item not found in cart' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while deleting the item from cart' });
    }
  };

async function getAddressCheckout (req,res) {
    try {
        const {branch} = req.params;
        // console.log('branch', branch)
        const {id} = req.account;
        const branchProv = await Branch.findByPk(branch, {attributes:['id_province', 'id_city']});
        // console.log("aaaa",branchProv.dataValues)
        const address = await Address.findAll({
            where: {
                id_user: id,
                userProvince: branchProv.dataValues.id_province
            }
        })
                // console.log(address)
        res.status(200).json({address, branchCity: branchProv.dataValues.id_city})
    } catch (error) {
        console.error('Error getting address:', error);
        res.status(500).json({ message: error });
    }
}

async function createTransaction (req, res) {
  try {
    const {cartId} = req.account
    // Find the Cart by its ID
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Copy columns from Cart to a new Transaction
    const transactionData = {
      id_user: cart.id_user,
      totPrice: cart.totPrice,
      totQty: cart.totQty,
      totPriceDiscount: cart.totDiscount,
      totWeight: cart.totWeight,
      // Copy any other columns from Cart that need to be included in the Transaction
    };

    // Copy additional data from the request body
    const {
      userAddress,
      id_branch,
      shipper,
      shippingMethod,
      shippingCost,
      shippingCostDiscount,
      // Add any other properties from the request body here
    } = req.body;

    // Add the additional data to the transactionData
    transactionData.userAddress = userAddress,
    transactionData.id_branch = id_branch;
    transactionData.shipper = shipper;
    transactionData.shippingMethod = shippingMethod;
    transactionData.shippingCost = shippingCost;
    transactionData.shippingCostDiscount = shippingCostDiscount;

    // Create a new Transaction with the copied data
    const newTransaction = await Transaction.create(transactionData);

    // Find the associated Cart_Stock records
    const cartStocks = await Cart_Stock.findAll({
      where: {
        id_cart: cartId,
      },
    });

    // Copy data from Cart_Stock to Transaction_Stock
    for (const cartStock of cartStocks) {
      const stock = await Stock.findByPk(cartStock.id_stock);
      const product = await Product.findByPk(stock.id_product);

      const transactionStockData = {
        id_transaction: newTransaction.id,
        id_stock: cartStock.id_stock,
        price: cartStock.price,
        qty: cartStock.qty,
        weight: cartStock.weight,
        id_product: stock.id_product,
        productName: product.name, // Include the product name
        // Copy any other columns from Cart_Stock that need to be included in Transaction_Stock
      };

      // Create a new Transaction_Stock record
      await Transaction_Stock.create(transactionStockData);

      await Stock.update(
        {
          qty: stock.qty - cartStock.qty, // Reduce quantity
        },
        {
          where: {
            id: cartStock.id_stock,
          },
        }
      );

      const stockHistoryData = {
        id_stock: cartStock.id_stock,
        changeQty: -cartStock.qty, // Negative quantity to indicate a decrease
        totalQty: stock.qty - cartStock.qty, // Updated total quantity
        changedBy: 'Transaction',
        id_change: newTransaction.id
         // You can specify who made the change here
        // Add other relevant information to the stock history record
      };
    
      // Create a new Stock_History record
      await Stock_History.create(stockHistoryData);

      await cartStock.destroy();

    }
    
    await Cart.update(
      {
        totPrice: 0,
        totQty: 0,
        totWeight: 0,
        totDiscount: 0,
      },
      {
        where: {
          id: cartId,
        },
      }
    );
    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {getAddressCheckout, createTransaction, deleteCartItems}