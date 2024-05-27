const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const { validateAuth, validateAuthLogin } = require('../validations/authValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate(validateAuth), registerUser);
router.post('/login', validate(validateAuthLogin), authUser);

module.exports = router;
