const db = require('../models')
const Stock = db.Stock;
const Category = db.Category;
const { Op } = require("sequelize");

async function getCategory(req, res)  {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const totalCategory = await Category.count();
      
        const totalPages = Math.ceil(totalCategory / limit);

        const size = (function() {
            if (totalPages > limit) {
                return limit;
            } else {
                return totalPages;
            }
        })();

        const category = await Category.findAll({
            limit: limit,
            offset: offset
        })
        res.status(200).json({data: {
            totalPages: totalPages,
            page: page,
            pageSize: size,
            category: category,
        }});
    } catch (error) {
        res.status(500).json({message: 'error fetching categories'})
    }
};

async function addCategory (req, res) {
    try {
        const {category} = req.body
         return db.sequelize.transaction(async (t) => {
               const addcategory = await Category.create(
                 {
                    categoryName: category
                 },
                 { transaction: t }
            );
            res.json({ message: 'Category added successfully', category: addcategory });
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
    

async function updateCategory (req, res) {
    try {
        const {id} = req.params;
        const {category} = req.body;
        return db.sequelize.transaction(async (t) => {
            const updatedCategory = await Category.update(
                {
                    categoryName: category
                },
                {
                    where: { id: id },
                    transaction: t
                }
            );
            if (updatedCategory[0] === 0) {
                res.status(404).json({ message: 'Category not found' });
            } else {
                res.json({ message: 'Category updated successfully', category: updatedCategory });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    };
};

async function getStockAdmin(req, res){
    try {
        console.log(req.query)
        const { page, limit, offset } = getPaginationParams(req);
        const where = buildStockFilterAdmin(req);
        const order = getStockSortOrder(req);
        const totalStocks = await Stock.count({ where });
        const totalPages = Math.ceil(totalStocks / limit);
        const size = (function() {
            if (totalPages > limit) {
                return limit;
            } else {
                return totalPages;
            }
        })();
        const Stocks = await getStocksAndIncludeAdmin(where, order, offset, limit);
        return res.status(200).json({
            message: "Stocks fetched successfully",
            data: {
                totalPages: totalPages,
                page: page,
                pageSize: size,
                Stocks: Stocks,
            }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Fetching Stocks failed' });
    }
}

const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

const buildStockFilterAdmin = (req) => {
    const { id_category, StockName } = req.query;
    const where = { };
    if (id_category) {
        where.categoryId = id_category; 
    }
    if (StockName) {
        where.StockName = { [Op.like]: `%${StockName}%` };
    }
    return where;
};

const getStockSortOrder = (req) => {
    const sort = req.query.sort || 'desc';
    const field = req.query.field || 'createdAt'; // default sort field
    return sort === 'asc' ? [[field, 'ASC']] : [[field, 'DESC']];
};

const getStocksAndIncludeAdmin = async (where, order, offset, limit) => {
    const includeOptions = [
        { model: Category },
    ];
    return await Stock.findAll({
        where,
        order,
        offset,
        limit,
        include: includeOptions,
    });
};

async function addStock(req,res){
    try {
        const {Stockname, Stockprice, Stockdes, category}  = req.body;
        return db.sequelize.transaction(async (t) => {
            const addStock = await Stock.create(
              {
                 StockName: Stockname,
                 StockPrice: Stockprice,
                 StockDescription: Stockdes,
                 StockImage: req.file.path,
                 categoryId: category
              },
              { transaction: t }
         );
         res.status(200).json({ message: 'Stock added successfully', category: addStock });
     });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message});
    };
};

module.exports = {getStockAdmin,getCategory, addCategory,  addStock, updateCategory}