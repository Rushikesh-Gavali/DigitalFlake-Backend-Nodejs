const express = require('express');
const { addState, updateState, deleteState, getStates } = require('../controllers/stateController');
const { protect } = require('../middlewares/authMiddleware');
const { validateState } = require('../validations/stateValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/')
  .post(protect, validate(validateState), addState)
  .get(protect, getStates);

router.route('/:id')
  .put(protect, validate(validateState), updateState)
  .delete(protect, deleteState);

module.exports = router;
