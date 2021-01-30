'use strict';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ValidationError } = require('express-validation');

var movementsRouter = require('./routes/movements');
const exploredTerritoryRouter = require('./routes/exploration-territory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movements', movementsRouter);
app.use('/explored-territory', exploredTerritoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json(err);
	}

	return res.status(500).json(err);
});

module.exports = app;
