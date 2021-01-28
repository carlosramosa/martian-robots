'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/mars';

var moveToNorth = function moveToNorth(_ref) {
  var x = _ref.x,
      y = _ref.y,
      o = _ref.o;
  return {
    x: x,
    y: y + 1,
    o: o
  };
};

var moveToSouth = function moveToSouth(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      o = _ref2.o;
  return {
    x: x,
    y: y - 1,
    o: o
  };
};

var moveToWest = function moveToWest(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      o = _ref3.o;
  return {
    x: x - 1,
    y: y,
    o: o
  };
};

var moveToEast = function moveToEast(_ref4) {
  var x = _ref4.x,
      y = _ref4.y,
      o = _ref4.o;
  return {
    x: x + 1,
    y: y,
    o: o
  };
};

var movementMap = {
  N: moveToNorth,
  S: moveToSouth,
  W: moveToWest,
  E: moveToEast
};

var move = function move(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      o = _ref5.o;
  return movementMap[o]({
    x: x,
    y: y,
    o: o
  });
};

var turnRightMap = {
  N: 'E',
  W: 'N',
  S: 'W',
  E: 'S'
};

var turnRight = function turnRight(_ref6) {
  var x = _ref6.x,
      y = _ref6.y,
      o = _ref6.o;
  return {
    x: x,
    y: y,
    o: turnRightMap[o]
  };
};

var turnLeftMap = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N'
};

var turnLeft = function turnLeft(_ref7) {
  var x = _ref7.x,
      y = _ref7.y,
      o = _ref7.o;
  return {
    x: x,
    y: y,
    o: turnLeftMap[o]
  };
};

var instructionsMap = {
  L: turnLeft,
  R: turnRight,
  F: move
};

var isOutOfLimit = function isOutOfLimit(original, size) {
  return function (currentPosition) {
    return original.x !== currentPosition.x && (currentPosition.x > size.x || currentPosition.x < 0) || original.y !== currentPosition.y && (currentPosition.y > size.y || currentPosition.y < 0);
  };
};

var checkIfIsLost = function checkIfIsLost(client, positionAux) {
  var value;
  return regeneratorRuntime.async(function checkIfIsLost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Searching for..', {
            'lostCoordinates': {
              x: positionAux.x,
              y: positionAux.y
            }
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(client.db('mars').collection('movements').findOne({
            'x': positionAux.x,
            'y': positionAux.y
          }));

        case 3:
          value = _context.sent;

          if (value) {
            _context.next = 9;
            break;
          }

          console.log('Inserting..', {
            x: positionAux.x,
            y: positionAux.y
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(client.db('mars').collection('movements').insertOne({
            x: positionAux.x,
            y: positionAux.y
          }));

        case 8:
          return _context.abrupt("return", true);

        case 9:
          return _context.abrupt("return", false);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var makeMovement = function makeMovement(position, size, instructions, client) {
  var isOutOfRange, currentPosition, res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, instruction, positionAux, value;

  return regeneratorRuntime.async(function makeMovement$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          isOutOfRange = isOutOfLimit(position, size);
          currentPosition = _objectSpread({}, position);
          res = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 6;
          _iterator = instructions[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 29;
            break;
          }

          instruction = _step.value;

          if (currentPosition.lost) {
            _context2.next = 26;
            break;
          }

          console.log(currentPosition);
          positionAux = instructionsMap[instruction](currentPosition);

          if (isOutOfRange(positionAux)) {
            _context2.next = 18;
            break;
          }

          currentPosition = positionAux;
          res.push(currentPosition);
          _context2.next = 26;
          break;

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap(client.db('mars').collection('movements').findOne({
            'x': positionAux.x,
            'y': positionAux.y
          }));

        case 20:
          value = _context2.sent;
          console.log(value);

          if (value) {
            _context2.next = 26;
            break;
          }

          currentPosition.lost = true;
          _context2.next = 26;
          return regeneratorRuntime.awrap(client.db('mars').collection('movements').insertOne({
            x: positionAux.x,
            y: positionAux.y
          }));

        case 26:
          _iteratorNormalCompletion = true;
          _context2.next = 8;
          break;

        case 29:
          _context2.next = 35;
          break;

        case 31:
          _context2.prev = 31;
          _context2.t0 = _context2["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 35:
          _context2.prev = 35;
          _context2.prev = 36;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 38:
          _context2.prev = 38;

          if (!_didIteratorError) {
            _context2.next = 41;
            break;
          }

          throw _iteratorError;

        case 41:
          return _context2.finish(38);

        case 42:
          return _context2.finish(35);

        case 43:
          ;
          return _context2.abrupt("return", res);

        case 45:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 31, 35, 43], [36,, 38, 42]]);
};

var moveAlien = function moveAlien(_ref8) {
  var size, movements, client, res, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, position, instructions;

  return regeneratorRuntime.async(function moveAlien$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          size = _ref8.size, movements = _ref8.movements;
          _context3.next = 3;
          return regeneratorRuntime.awrap(MongoClient.connect(url));

        case 3:
          client = _context3.sent;
          // const a = await client.get(`${size.x}${size.y}`);
          // await client.set(`${size.x}${size.y}`, 'hola');
          // const asd = await client.get(`${size.x}${size.y}`);
          res = [];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 8;
          _iterator2 = movements[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context3.next = 20;
            break;
          }

          _step2$value = _step2.value, position = _step2$value.position, instructions = _step2$value.instructions;
          _context3.t0 = res;
          _context3.next = 15;
          return regeneratorRuntime.awrap(makeMovement(position, size, instructions, client));

        case 15:
          _context3.t1 = _context3.sent;

          _context3.t0.push.call(_context3.t0, _context3.t1);

        case 17:
          _iteratorNormalCompletion2 = true;
          _context3.next = 10;
          break;

        case 20:
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t2 = _context3["catch"](8);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t2;

        case 26:
          _context3.prev = 26;
          _context3.prev = 27;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 29:
          _context3.prev = 29;

          if (!_didIteratorError2) {
            _context3.next = 32;
            break;
          }

          throw _iteratorError2;

        case 32:
          return _context3.finish(29);

        case 33:
          return _context3.finish(26);

        case 34:
          return _context3.abrupt("return", res);

        case 35:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[8, 22, 26, 34], [27,, 29, 33]]);
};

module.exports = {
  move: moveAlien
}; //"instructions": ["R", "F","R", "F","R", "F", "R", "F"] --> 1,1,
//["F","R","R","F","L","L","F","F","R","R","F","L","L"]
//"instructions": ["L","L","F","F","F","L","F","L","F","L"]