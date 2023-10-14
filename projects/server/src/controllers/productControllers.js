const db = require("../models");
const product = db.Product;
const category = db.Category;
const { Op } = db.Sequelize;

const productControllers = {
  getProductById: async (req, res) => {
    try {
      const products = await product.findOne({
        attributes: { exclude: ["categoryId"] },
        where: { id: req.params.id },
        include: [
          {
            model: category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      if (!products)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product found", data: products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get product", error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        name,
        price,
        productImg,
        description,
        weight,
        isActive,
        id_category,
      } = req.body;
      await db.sequelize.transaction(async (t) => {
        const result = await product.create(
          {
            name,
            price,
            productImg: req.file.path,
            description,
            weight,
            isActive,
            id_category,
          },
          { transaction: t }
        );
        res.status(200).json({
          message: "Product created successfully",
          data: result,
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create product", error: error.message });
    }
  },

  getProduct: async (req, res) => {
    const {
      id,
      name,
      id_category,
      sort_createdAt,
      sort_name,
      sort_Harga,
      size,
      page,
    } = req.query;
    const limitPerPage = parseInt(size) || 40;
    const pageNumber = parseInt(page) || 1;
    const offset = limitPerPage * (pageNumber - 1);
    const findName = { name: { [Op.like]: `%${name || ""}%` } };
    if (id_category) findName.id_category = id_category;

    try {
      let sortOptions = [];
      if (sort_createdAt) {
        sortOptions.push([
          "createdAt",
          sort_createdAt.toUpperCase() === "DESC" ? "DESC" : "ASC",
        ]);
      }
      if (id) {
        sortOptions.push(["id", id.toUpperCase() === "DESC" ? "DESC" : "ASC"]);
      }
      if (sort_Harga) {
        sortOptions.push([
          "price",
          sort_Harga.toUpperCase() === "DESC" ? "DESC" : "ASC",
        ]);
      }

      if (sort_name) {
        sortOptions.push([
          "name",
          sort_name.toUpperCase() === "DESC" ? "DESC" : "ASC",
        ]);
      }

      const products = await product.findAll({
        attributes: { exclude: ["id_category"] },
        where: findName,
        limit: limitPerPage,
        offset,
        include: [
          {
            model: category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        order: sortOptions,
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Get Product Success",
        limit: limitPerPage,
        productPage: pageNumber,
        data: products,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get product", error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, description, weight, isActive, id_category } =
        req.body;

      const updatedFields = {
        name,
        price,
        description,
        weight,
        isActive,
        id_category,
      };

      if (req.file) {
        updatedFields.productImg = req.file.path;
      }

      const updatedProduct = await product.update(updatedFields, {
        where: { id: productId },
      });

      if (updatedProduct[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update product", error: error.message });
    }
  },

  deactivateProduct: async (req, res) => {
    try {
      const updatedProduct = await product.update(
        { isActive: false },
        { where: { id: req.params.id } }
      );

      if (updatedProduct[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deactivated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to deactivate product",
        error: error.message,
      });
    }
  },

  activateProduct: async (req, res) => {
    try {
      const updatedProduct = await product.update(
        { isActive: true },
        { where: { id: req.params.id } }
      );

      if (updatedProduct[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product activated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to activate product", error: error.message });
    }
  },
};

module.exports = productControllers;
