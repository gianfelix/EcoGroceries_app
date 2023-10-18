const db = require('../models')
const { Op } = require("sequelize");
const Transaction = db.Transaction;
const TP = db.Transaction_Stock;
const Product = db.Product;
const Category = db.Category;
const Stock = db.Stock;
const Cart = db.Cart;
const Cart_Stock = db.Cart_Stock;
const Stock_Promos = db.Stock_Promos;

async function updateCart(req, res) {
  try {
    const { stockId, quantity } = req.body;
    const { cartId } = req.account;
    // console.log(quantity)

    await db.sequelize.transaction(async (t) => {
      const stockItem = await Stock.findByPk(stockId, {
        include: {
          model: Product,
        },
        attributes: ['id', 'id_stock_promo', 'discountPercent'],
        transaction: t,
      });

      if (!stockItem) {
        throw new Error('Stock item not found');
      }

      const weight = stockItem.Product.weight * quantity;
      const price = stockItem.Product.price * quantity;
      const discountPercent = stockItem.discountPercent;

      // Calculate the discount based on the discountPercent
      const discount = (price * discountPercent) / 100;

      const [cartStockItem, created] = await Cart_Stock.findOrCreate({
        where: { id_stock: stockItem.id, id_cart: cartId },
        defaults: {
          price: price,
          qty: quantity,
          weight: weight,
          discount: discount, // Add the discount field
        },
        transaction: t,
      });

      if (!created) {
        await Cart_Stock.update(
          {
            price: price,
            qty: quantity,
            weight: weight,
            discount: discount, // Update the discount field
          },
          {
            where: { id_stock: stockItem.id, id_cart: cartId },
            transaction: t,
          }
        );
      }

      const cartStockItems = await Cart_Stock.findAll({
        where: { id_cart: cartId },
        transaction: t,
      });

      // Calculate total price, total quantity, and total weight
      const totPrice = cartStockItems.reduce((total, item) => total + item.price, 0);
      const totQty = cartStockItems.reduce((total, item) => total + item.qty, 0);
      const totWeight = cartStockItems.reduce((total, item) => total + item.weight, 0);
      const totDiscount = cartStockItems.reduce((total, item) => total + item.discouunt, 0);

      // Check if the stock item has a stock promo
      // if (stockItem.id_stock_promo) {
      //   const stockPromo = await Stock_Promos.findByPk(stockItem.id_stock_promo, { transaction: t });

      //   if (stockPromo) {
      //     // Check if the buyQty condition is met
      //     if (quantity >= stockPromo.buyQty) {
      //       // Calculate the additional items to add based on getQty
      //       const additionalQty = Math.floor(quantity / stockPromo.buyQty) * stockPromo.getQty;

      //       // Adjust quantity and price in cartStockItem
      //       await Cart_Stock.update(
      //         {
      //           qty: cartStockItem.qty + additionalQty,
      //           price: cartStockItem.price + additionalQty * stockItem.Product.price,
      //         },
      //         {
      //           where: { id_stock: stockItem.id, id_cart: cartId },
      //           transaction: t,
      //         }
      //       );
      //     }
      //   }
      // }

      await Cart.update(
        {
          totPrice: totPrice,
          totQty: totQty,
          totWeight: totWeight,
          totDiscount: totDiscount
        },
        {
          where: { id: cartId },
          transaction: t,
        }
      );

      res.status(201).json({
        ...cartStockItem.toJSON(),
        discountPercent: stockItem.discountPercent,
        id_stock_promo: stockItem.id_stock_promo,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function resetCart(req, res) {
    try {
      const { cartId } = req.account;
      await db.sequelize.transaction(async (t) => {
        await Cart.update(
          {
            totPrice: 0,
            totQty: 0,
            totWeight: 0,
          },
          {
            where: { id: cartId },
            transaction: t,
          }
        );
  
        await Cart_Stock.destroy({
          where: { id_cart: cartId },
          transaction: t,
        });
      });
      res.status(200).json({ message: 'Cart deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting cart.' });
    }
  }
async function getCart(req, res) {
  try {
    console.log(req.account)
    const { cartId } = req.account;
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the cart' });
  }
};
async function getCartItems(req, res) {
  try {
    const { cartId } = req.account;
    console.log

    if (!cartId) {
      return res.status(400).json({ message: 'Invalid cartId' });
    }

    const cartItems = await Cart_Stock.findAll({
      where: { id_cart: cartId },
      include: [
        {
          model: Stock,
          include: [
            {
              model: Product, 
              attributes: ['name', 'price','productImg'], 
            },
          ],
        },
      ],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching cart items', error: error.message });
  }
}
  module.exports ={resetCart, updateCart, getCartItems, getCart }