const { Components, Products, ProductComponents } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const products = await Products.findAll({
        include: [
          {
            model: Components,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            through: {
              attributes: [],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      return res.status(200).json({
        status: true,
        message: "Success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, quantity, component_id } = req.body;

      if (name == null || name == "") {
        return res.status(400).json({
          status: false,
          message: "field name is required",
          data: null,
        });
      }

      if (quantity == null || quantity == "") {
        return res.status(400).json({
          status: false,
          message: "field quantity is required",
          data: null,
        });
      }

      if (component_id == null || component_id == "") {
        return res.status(400).json({
          status: false,
          message: "field component_id is required",
          data: null,
        });
      }

      const findComponent = await Components.findByPk(component_id, {
        raw: true,
      });

      if (!findComponent) {
        return res.status(404).json({
          status: false,
          message: `Component with Id ${component_id} Not Exist!`,
          data: null,
        });
      }

      const addProduct = await Products.create({
        name: name,
        quantity: quantity,
      });

      const addComponent = await ProductComponents.create({
        product_id: addProduct.id,
        component_id: component_id,
      });

      return res.status(201).json({
        status: true,
        message: "Success",
        data: [addProduct, addComponent],
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const showProduct = await Products.findOne({
        include: [
          {
            model: Components,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            through: {
              attributes: [],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          id: productId,
        },
      });

      if (!showProduct) {
        return res.status(404).json({
          status: false,
          message: `Product with Id ${productId} Not Exist!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success",
        data: showProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { name, quantity, component_id } = req.body;

      const product = await Products.findByPk(productId, { raw: true });

      if (!product) {
        return res.status(404).json({
          status: false,
          message: `Product with Id ${productId} Not Exist!`,
          data: null,
        });
      }

      if (component_id == null) {
        await Products.update(
          {
            name: name || product.name,
            quantity: quantity || product.quantity,
          },
          {
            where: {
              id: productId,
            },
          }
        );

        return res.status(201).json({
          status: true,
          message: `Product with Id ${productId} Updated!`,
          data: null,
        });
      }

      const findComponent = await Components.findByPk(component_id, {
        raw: true,
      });

      if (!findComponent) {
        return res.status(404).json({
          status: false,
          message: `Component with Id ${component_id} Not Exist!`,
          data: null,
        });
      }

      await Products.update(
        {
          name: name || product.name,
          quantity: quantity || product.quantity,
        },
        {
          where: {
            id: productId,
          },
        }
      );

      await ProductComponents.update(
        {
          product_id: productId,
          component_id: component_id,
        },
        { where: { product_id: productId } }
      );

      return res.status(201).json({
        status: true,
        message: `Product with Id ${productId} Updated!`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const deleteProduct = await Products.destroy({
        where: { id: productId },
      });

      if (!deleteProduct) {
        return res.status(404).json({
          status: false,
          message: `Product with Id ${productId} Not Exist!`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: `Product with Id ${productId} Deleted!`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
