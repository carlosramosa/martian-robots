const express = require('express')
const { validate, ValidationError, Joi } = require('express-validation')
const router = express.Router();
const postMovement = require('./POST');
const getMovements = require('./GET');
const { moveSchema } = require('../../schemas')
router.get('/', getMovements);
router.post('/',  validate(moveSchema, {}, {}), postMovement);

module.exports = router;
