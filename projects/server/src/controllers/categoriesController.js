const db = require("../models");
// const product = db.Product;
const Category = db.Category;
const { Op } = db.Sequelize;

const categoriesController = {
  createCategory: async (req, res) => {
    try {
      const { category } = req.body;
      await db.sequelize.transaction(async (t) => {
        const result = await Category.create(
          {
            category,
          },
          { transaction: t }
        );
        res.status(200).json({
          message: "Category created successfully",
          data: {
            id: result.id,
            category: result.category,
            isActive: result.isActive,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
          },
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create category", error: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
  
      if (categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }
  
      res.status(200).json({
        message: "Get Categories Success",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get categories", error: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const categoryData = await Category.findByPk(categoryId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
  
      if (!categoryData) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({
        message: "Get Category by ID Success",
        data: categoryData,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get category by ID", error: error.message });
    }
  },  

  updateCategory: async (req, res) => {
    try {
      const categoryId = req.query.id;
      const updatedName = req.body.category;

      const existingCategory = await Category.findOne({
        where: {
          category: updatedName,
          id: {
            [Op.ne]: categoryId, 
          },
        },
      });

      if (existingCategory) {
        return res
          .status(409)
          .json({ message: "Category name already exists. Choose a different name." });
      }

      const updatedCategory = await Category.findByPk(categoryId);
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      updatedCategory.category = updatedName;
      await updatedCategory.save();

      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update Category", error: error.message });
    }
  },

  deactivateCategory: async (req, res) => {
    const categoryId = req.query.id;
  
    try {
      const categoryToUpdate = await Category.findByPk(categoryId);
      if (!categoryToUpdate) {
        return res.status(404).json({ message: "Category not found" });
      }

      categoryToUpdate.isActive = false;
      await categoryToUpdate.save();
      

      res.status(200).json({ message: "Category delete/deactivated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete/deactivate category", error: error.message });
    }
  },
  
  activateCategory: async (req, res) => {
    const categoryId = req.query.id;
  
    try {
      const categoryToUpdate = await Category.findByPk(categoryId);
      if (!categoryToUpdate) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      categoryToUpdate.isActive = true;
      await categoryToUpdate.save();
  
      res.status(200).json({ message: "Category activated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to activate category", error: error.message });
    }
  },

};

module.exports = categoriesController;
