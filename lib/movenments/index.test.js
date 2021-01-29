'use strict';
const express = require('express')
const { validate, ValidationError, Joi } = require('express-validation')
const router = express.Router();
const { moveSchema } = require('../../schemas');
const { move } = require('../../lib/movenments/move-robots')
/* GET users listing. */
router.get('/', async ({ body }, res, next) => {
  const result = await getAllMovements(body);
  res.send(result);
});

module.exports = router;
