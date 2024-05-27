const express = require('express');
const {
  createCity,
  getCities,
  updateCity,
  deleteCity,
} = require('../controllers/cityController');
const { validateCity } = require('../validations/cityValidation');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/')
  .post(protect, validate(validateCity), createCity)
  .get(protect, getCities);

router.route('/:id')
  .put(protect, validate(validateCity), updateCity)
  .delete(protect, deleteCity);

module.exports = router;
