'use strict';

const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();
const postMovement = require('./POST');
const getMovements = require('./GET.JS');
const { postMovements } = require('../../schemas');

router.get('/', getMovements);
router.post('/',  validate(postMovements, {}, {}), postMovement);

module.exports = router;
