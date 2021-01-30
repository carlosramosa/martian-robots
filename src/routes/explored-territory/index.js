'use strict';

const { getTerritoryExploredSchema } = require('../../schemas');

const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();
const getExploredTerritories = require('./get-explored-territory.js');

router.get('/', validate(getTerritoryExploredSchema, {}, {}), getExploredTerritories);

module.exports = router;
