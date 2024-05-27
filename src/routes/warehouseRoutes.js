const express = require('express');
const {
  createWarehouse,
  getWarehouses,
  updateWarehouse,
  deleteWarehouse,
} = require('../controllers/warehouseController');
const { validateWarehouse } = require('../validations/warehouseValidation');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/')
  .post(protect, validate(validateWarehouse), createWarehouse)
  .get(protect, getWarehouses);

router.route('/:id')
  .put(protect, validate(validateWarehouse), updateWarehouse)
  .delete(protect, deleteWarehouse);

module.exports = router;
