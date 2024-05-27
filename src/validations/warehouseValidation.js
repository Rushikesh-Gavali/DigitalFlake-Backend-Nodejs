const { check } = require('express-validator');

exports.validateWarehouse = [
  check('warehouseName', 'Warehouse name is required').not().isEmpty(),
  check('cityName', 'City name is required').not().isEmpty(),
  check('stateName', 'State name is required').not().isEmpty(),
];
