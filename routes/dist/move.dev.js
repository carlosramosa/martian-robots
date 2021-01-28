'use strict';

var express = require('express');

var _require = require('express-validation'),
    validate = _require.validate,
    ValidationError = _require.ValidationError,
    Joi = _require.Joi;

var router = express.Router();

var _require2 = require('../schemas'),
    moveSchema = _require2.moveSchema;

var _require3 = require('../lib/move'),
    move = _require3.move;
/* GET users listing. */


router.post('/', validate(moveSchema, {}, {}), function _callee(_ref, res, next) {
  var body, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = _ref.body;
          _context.next = 3;
          return regeneratorRuntime.awrap(move(body));

        case 3:
          result = _context.sent;
          res.send(result);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;