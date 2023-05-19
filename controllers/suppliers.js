const { Components, ComponentSuppliers, Suppliers } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const suppliers = await Suppliers.findAll({
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
        data: suppliers,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, address, component_id } = req.body;

      if (name == null || name == "") {
        return res.status(400).json({
          status: false,
          message: "Field name is required!",
          data: null,
        });
      }

      if (address == null || address == "") {
        return res.status(400).json({
          status: false,
          message: "Field address is required!",
          data: null,
        });
      }

      if (component_id == null) {
        const addSupplier = await Suppliers.create({
          name: name,
          address: address,
        });

        return res.status(201).json({
          status: true,
          message: "Success",
          data: addSupplier,
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

      const addSupplier = await Suppliers.create({
        name: name,
        address: address,
      });

      const addComponent = await ComponentSuppliers.create({
        supplier_id: addSupplier.id,
        component_id: component_id,
      });

      return res.status(201).json({
        status: true,
        message: "Success",
        data: [addSupplier, addComponent],
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { supplierId } = req.params;

      const showSupplier = await Suppliers.findOne({
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
          id: supplierId,
        },
      });

      if (!showSupplier) {
        return res.status(404).json({
          status: false,
          message: `Supplier with Id ${supplierId} Not Exist!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success",
        data: showSupplier,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { supplierId } = req.params;
      const { name, address, component_id } = req.body;

      const supplier = await Suppliers.findByPk(supplierId, { raw: true });

      if (!supplier) {
        return res.status(404).json({
          status: false,
          message: `Supplier with Id ${supplierId} Not Exist`,
        });
      }

      if (component_id == null) {
        await Suppliers.update(
          {
            name: name || supplier.name,
            address: address || supplier.address,
          },
          {
            where: {
              id: supplierId,
            },
          }
        );

        return res.status(201).json({
          status: true,
          message: `Supplier with Id ${supplierId} Updated!`,
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
        });
      }

      await Suppliers.update(
        {
          name: name || supplier.name,
          address: address || supplier.address,
        },
        {
          where: {
            id: supplierId,
          },
        }
      );

      await ComponentSuppliers.update(
        { component_id: component_id },
        { where: { supplier_id: supplier.id } }
      );

      return res.status(201).json({
        status: true,
        message: `Supplier with Id ${supplierId} Updated!`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { supplierId } = req.params;

      const deleteSupplier = await Suppliers.destroy({
        where: { id: supplierId },
      });

      if (!deleteSupplier) {
        return res.status(404).json({
          status: false,
          message: `Supplier with Id ${supplierId} Not Exist`,
        });
      }

      return res.status(201).json({
        status: true,
        message: `Supplier with Id ${supplierId} Deleted!`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
