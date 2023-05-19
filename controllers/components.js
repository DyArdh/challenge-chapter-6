const {
  Components,
  ProductComponents,
  Products,
  Suppliers,
} = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const components = await Components.findAll({
        include: [
          {
            model: Products,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            through: {
              attributes: [],
            },
          },
          {
            model: Suppliers,
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
        data: components,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      if (name == null || name == "") {
        return res.status(400).json({
          status: false,
          message: "Field name is required!",
          data: null,
        });
      }

      if (description == null || description == "") {
        return res.status(400).json({
          status: false,
          message: "Field description is required!",
          data: null,
        });
      }

      const addComponent = await Components.create({
        name: name,
        description: description,
      });

      return res.status(201).json({
        status: true,
        message: "Success",
        data: addComponent,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { componentId } = req.params;

      const showComponent = await Components.findOne({
        include: [
          {
            model: Products,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            through: {
              attributes: [],
            },
          },
          {
            model: Suppliers,
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
          id: componentId,
        },
      });

      if (!showComponent) {
        return res.status(404).json({
          status: false,
          message: `Component with Id ${componentId} Not Exist!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success",
        data: showComponent,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { componentId } = req.params;
      const { name, description } = req.body;

      const component = await Components.findByPk(componentId, { raw: true });

      if (!component) {
        return res.status(404).json({
          status: false,
          message: `Component with Id ${componentId} Not Exist!`,
        });
      }

      await Components.update(
        {
          name: name || component.name,
          description: description || component.description,
        },
        {
          where: {
            id: componentId,
          },
        }
      );

      return res.status(201).json({
        status: true,
        message: `Component with Id ${componentId} Updated!`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { componentId } = req.params;

      const checkComponentUse = await ProductComponents.findOne({
        where: { component_id: componentId },
      });

      if (checkComponentUse) {
        return res.status(409).json({
          status: false,
          message: `Component with Id ${componentId} in use!`,
        });
      }

      const deleteComponent = await Components.destroy({
        where: { id: componentId },
      });

      if (!deleteComponent) {
        return res.status(404).json({
          status: false,
          message: `Component with Id ${componentId} Not Exist!`,
        });
      }

      return res.status(201).json({
        status: true,
        message: `Component with Id ${componentId} Deleted!`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
