const db = require("../models");
const Stock_Promos = db.Stock_Promos;

const stockPromoControllers = {
  createStockPromo: async (req, res) => {
    try {
      const { promoName, buyQty, getQty, isActive } = req.body;

      const stockPromo = await Stock_Promos.create({
        promoName,
        buyQty,
        getQty,
        isActive,
      });

      res.status(201).json({
        message: "Stock Promo created successfully",
        data: stockPromo,
      });
    } catch (error) {
      console.error("Error creating Stock Promo:", error);
      res.status(500).json({
        error: "Failed to create Stock Promo",
      });
    }
  },

  updateStockPromo: async (req, res) => {
    try {
      const { id } = req.params;
      const { promoName, buyQty, getQty, isActive } = req.body;

      const stockPromo = await Stock_Promos.findByPk(id);

      if (!stockPromo) {
        return res.status(404).json({ error: "Stock Promo not found" });
      }

      stockPromo.promoName = promoName;
      stockPromo.buyQty = buyQty;
      stockPromo.getQty = getQty;
      stockPromo.isActive = isActive;

      await stockPromo.save();

      res.status(200).json({ message: "Stock Promo updated successfully" });
    } catch (error) {
      console.error("Error updating stock promo:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllStockPromo: async (req, res) => {
    try {
      const stockPromos = await Stock_Promos.findAll();
      res.status(200).json({ data: stockPromos });
    } catch (error) {
      console.error("Error fetching stock promos:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deactivateStockPromo: async (req, res) => {
    try {
      const { id } = req.params;
      const stockPromo = await Stock_Promos.findByPk(id);

      if (!stockPromo) {
        return res.status(404).json({ error: "Stock Promo not found" });
      }

      stockPromo.isActive = false;
      await stockPromo.save();

      res.status(200).json({ message: "Stock Promo deactivated successfully" });
    } catch (error) {
      console.error("Error deactivating stock promo:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  activateStockPromo: async (req, res) => {
    try {
      const { id } = req.params;
      const stockPromo = await Stock_Promos.findByPk(id);

      if (!stockPromo) {
        return res.status(404).json({ error: "Stock Promo not found" });
      }

      stockPromo.isActive = true;
      await stockPromo.save();

      res.status(200).json({ message: "Stock Promo activated successfully" });
    } catch (error) {
      console.error("Error activating stock promo:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = stockPromoControllers;
