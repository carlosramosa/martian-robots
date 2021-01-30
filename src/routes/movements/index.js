'use strict';

const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();
const postMovement = require('./POST');
const getMovements = require('./GET');
const { postMovementsSchema, getMovementsSchema } = require('../../schemas');

router.get('/', validate(getMovementsSchema, {}, {}), getMovements);
router.post('/',  validate(postMovementsSchema, {}, {}), postMovement);

module.exports = router;
