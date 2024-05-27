const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  warehouseName: { type: String, required: true },
  cityName: { type: String, required: true },
  stateName: { type: String, required: true },
  status: { type: String, default: 'Active' },
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;
