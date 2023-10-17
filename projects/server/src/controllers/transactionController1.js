const db = require("../models");
const Transaction = db.Transaction;
const User = db.User;
const Transaction_Stock = db.Transaction_Stock;
const Transaction_Payment = db.Transaction_Payment;
const Transaction_Status = db.Transaction_Status;
const Stock_History = db.Stock_History;
const Stock = db.Stock;
const Branch = db.Branch;
const Op = db.Sequelize.Op;

async function getTransactionUser (req, res) {
    try {
        const {id} = req.account;
        const userTr = await Transaction.findAll(
            {
                where: {id_user: id}
            },
            // {
            //     include 
            // }
            )
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
}

async function getTransactionById (req, res) {
    try {
        const {id} = req.params;
      const record = await Transaction.findByPk(id)
      res.status(200).json(record)
    } catch (error) {
      console.error(error)
      res.status(500).json(error);
    }
}

async function getAllTransactionByBranch(req, res) {
  try {
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 10 ? 10 : limit;
    const offset = (page - 1) * limit;
    const { branch } = req.account;

    const sortOrder = req.query.sortOrder || 'DESC'; // Default to DESC if not provided
    const sortBy = req.query.sortBy || 'createdAt'; // Default to createdAt if not provided

    const query = {
      order: [[sortBy, sortOrder]], // Specify the sorting criteria
      where: { id_branch: branch },
      limit: limit,
      offset: offset,
    };

    if (req.query.id_user) {
      query.where.id_user = req.query.id_user;
    }

    if (req.query.startDate && req.query.endDate) {
      query.where.createdAt = {
        [Op.between]: [
          new Date(req.query.startDate),
          new Date(req.query.endDate).setHours(23, 59, 59),
        ],
      };
    }

    const transactions = await Transaction.findAll({
      where: {
        id_branch: branch,
      },
      include: [
        {
          model: Transaction_Status,
          attributes: ['status'],
        },
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Transaction_Stock
        }
      ],
      order: [[sortBy, sortOrder]], // Specify the sorting criteria
      limit: limit,
      offset: offset,
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getAllTransaction (req, res) {
  try {
    const page = req.query.page || 1; // Default to page 1 if not provided
    let limit = req.query.limit || 10; // Default to 10 records per page if not provided
    limit = limit > 10 ? 10 : limit; // If limit exceeds 10, set it back to 10
    const offset = (page - 1) * limit;

    const query = {
      order: [
        ['createdAt', 'DESC'],
        ['id_branch', 'ASC'],
        ['id_status', 'ASC'],
      ],
      where: {},
      limit: limit,
      offset: offset,
    };

    if (req.query.id_branch) {
      query.where.id_branch = req.query.id_branch;
    }

    if (req.query.id_user) {
      query.where.id_user = req.query.id_user;
    }

    if (req.query.startDate && req.query.endDate) {
      query.where.createdAt = {
        [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate).setHours(23, 59, 59)],
      };
    }

    const transactions = await Transaction.findAll({
      where: {
        id: { [Op.ne]: null },
      },
      include: [{model: Transaction_Status, attributes:['status']}, {model: User, attributes:['id', 'name']}, {model: Branch, attributes:['id', 'name']}, {model: Transaction_Stock}]
    });
    
    res.status(200).json({transaction:transactions});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getStockHistoryByBranch(req, res) {
  try {
    const { id_branch } = req.account; // Replace with the actual id_branch you want to query for

    const stocks = await Stock_History.findAll({
      include: {
        model: Stock,
        where: {
          id_branch: id_branch,
        },
      },
    });

    res.status(200).json(stocks); // Send the result as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function getStockHistoryIdByBranch(req, res) {
  try {
    const { id_branch } = req.account; // Replace with the actual id_branch you want to query for
    const {id} = req.params;
    const stocks = await Stock_History.findByPk(id,{
      include: {
        model: Stock,
        where: {
          id_branch: id_branch,
        },
      },
    });

    res.status(200).json(stocks); // Send the result as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

  async function getTransactionDetail (req, res) {
    try {
      const {id} = req.params;
      const transaction = await Transaction.findByPk(id, {
        include: [
          {
              model: Transaction_Stock,
              include: [{ model: Product }]
          }
      ]
      })
      res.status(200).json(transaction)
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async function cancelTransaction (req,res) {
    try {
      const {id} = req.params;
      const transaction = await Transaction.update({id_status: 6}, {
        where : {
          id: id
        }
      })
      res.status(200).json({message: 'succeed cancelling order'})
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  module.exports = {getTransactionById, 
    getStockHistoryByBranch, 
    getTransactionDetail, cancelTransaction,
    getTransactionUser, getAllTransaction,
    getStockHistoryIdByBranch, getAllTransactionByBranch
  }