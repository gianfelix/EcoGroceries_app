const db = require("../models");
const Transaction = db.Transaction;
const User = db.User;
const Address = db.User_Address;
const Status = db.Transaction_Status;
const { Op } = db.Sequelize;

const transactionControllers = {
  getAllTransaction: async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "name"],
          },
          {
            model: Address,
            attributes: ["id", "userCity", "userProvince"], 
          },
          {
            model: Status,
            attributes: ["id", "status"], 
          },
        ],
      });

      res.status(200).json({ transactions });
    } catch (error) {
      console.error("Error getting transactions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = transactionControllers;
