const { check } = require('express-validator');

exports.validateState = [
  check('stateName', 'State name is required').not().isEmpty(),
  check('stateCode', 'State code is required').not().isEmpty(),
];
