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

async function getStockYK(req, res) {
    try {
      const branchId = 3; // Replace with the branch ID you want to query
      let { sortBy, filterByCategory } = req.query;
  
      // Define the default sorting and filtering options
      sortBy = sortBy || 'name'; // Default to sorting by name
      filterByCategory = filterByCategory || null; // Default to no category filter
  
      const stockQueryOptions = {
        where: {
          id_branch: branchId,
        },
        include: [
          {
            model: Product,
            attributes: ['name', 'price'],
            include: [
              {
                model: Category, // Include the Category model
                attributes: ['category'], // You can specify which attributes to include from Category
              },
            ],
          },
        ],
      };
  
      // Add sorting option based on sortBy parameter
      if (sortBy === 'price') {
        stockQueryOptions.order = [['Product', 'price', 'ASC']];
      } else {
        stockQueryOptions.order = [['Product', 'name', 'ASC']];
      }
  
      // Add category filter if provided
      if (filterByCategory) {
        stockQueryOptions.include[0].where = {
          id_category: filterByCategory,
        };
      }
  
      // Query the Stock model with the specified options
      const stocks = await Stock.findAll(stockQueryOptions);
  
      res.json(stocks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }
  
  
  async function getStockJKT(req, res) {
    try {
        const branchId = 1; // Replace with the branch ID you want to query
        let { sortBy, filterByCategory } = req.query;
    
        // Define the default sorting and filtering options
        sortBy = sortBy || 'name'; // Default to sorting by name
        filterByCategory = filterByCategory || null; // Default to no category filter
    
        const stockQueryOptions = {
          where: {
            id_branch: branchId,
          },
          include: [
            {
              model: Product,
              attributes: ['name', 'price'],
              include: [
                {
                  model: Category, // Include the Category model
                  attributes: ['category'], // You can specify which attributes to include from Category
                },
              ],
            },
          ],
        };
    
        // Add sorting option based on sortBy parameter
        if (sortBy === 'price') {
          stockQueryOptions.order = [['Product', 'price', 'ASC']];
        } else {
          stockQueryOptions.order = [['Product', 'name', 'ASC']];
        }
    
        // Add category filter if provided
        if (filterByCategory) {
          stockQueryOptions.include[0].where = {
            id_category: filterByCategory,
          };
        }
    
        // Query the Stock model with the specified options
        const stocks = await Stock.findAll(stockQueryOptions);
    
        res.json(stocks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
  }
  
  async function getStockById(req, res) {
    try {
        const { id } = req.params;
        const stock = await Stock.findByPk(id, {
            include: [
                { model: Product },
                { model: Stock_Promos }
            ]
        });

        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        res.json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {getStockYK, getStockJKT, getStockById}