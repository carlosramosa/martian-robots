const express = require('express')
const { validate, ValidationError, Joi } = require('express-validation')
const router = express.Router();
const { getAllMovements } = require('../../lib/movenments/robot-movements')
/* GET users listing. */
const getMovements =  async (req, res, next) => {
  const result = await getAllMovements();
  res.send(result);
};

module.exports = getMovements;
