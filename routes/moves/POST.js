'use strict';
const express = require('express')
const { validate, ValidationError, Joi } = require('express-validation')
const router = express.Router();
const { moveSchema } = require('../../schemas');
const { move } = require('../../lib/movenments/move-robots')
/* GET users listing. */
const postMovement = async ({ body }, res, next) => {
  const result = await move(body);
  res.send(result);
}

module.exports = postMovement;
