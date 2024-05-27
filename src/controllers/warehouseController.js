const asyncHandler = require('express-async-handler');
const Warehouse = require('../models/warehouse');

const createWarehouse = asyncHandler(async (req, res) => {
  const { warehouseName, cityName, stateName } = req.body;

  const warehouse = new Warehouse({ warehouseName, cityName, stateName });
  await warehouse.save();
  res.formatResponse(201, 'Warehouse created successfully', warehouse);
});

const getWarehouses = asyncHandler(async (req, res) => {
  const warehouses = await Warehouse.find();
  res.formatResponse(200, 'Warehouses retrieved successfully', warehouses);
});

const updateWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { warehouseName, cityName, stateName, status } = req.body;

  const warehouse = await Warehouse.findById(id);

  if (warehouse) {
    warehouse.warehouseName = warehouseName || warehouse.warehouseName;
    warehouse.cityName = cityName || warehouse.cityName;
    warehouse.stateName = stateName || warehouse.stateName;
    warehouse.status = status || warehouse.status;

    const updatedWarehouse = await warehouse.save();
    res.formatResponse(200, 'Warehouse updated successfully', updatedWarehouse);
  } else {
    res.formatResponse(404, 'Warehouse not found');
  }
});

const deleteWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const warehouse = await Warehouse.findById(id);

  if (warehouse) {
    await Warehouse.deleteOne({ _id: warehouse._id });
    res.formatResponse(200, 'Warehouse removed successfully');
  } else {
    res.formatResponse(404, 'Warehouse not found');
  }
});

module.exports = {
  createWarehouse,
  getWarehouses,
  updateWarehouse,
  deleteWarehouse,
};
