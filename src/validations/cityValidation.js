const { check } = require('express-validator');

exports.validateCity = [
  check('cityName', 'City name is required').not().isEmpty(),
  check('cityCode', 'City code is required').not().isEmpty(),
  check('stateName', 'State name is required').not().isEmpty(),
];
