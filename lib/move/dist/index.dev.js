"use strict";

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
    return original.x !== currentPosition.x && (currentPosition.x >= size.x || currentPosition.x <= 0) || original.y !== currentPosition.y && (currentPosition.y >= size.y || currentPosition.y <= 0);
  };
};

var moveAlien = function moveAlien(_ref8) {
  var size = _ref8.size,
      position = _ref8.position,
      instructions = _ref8.instructions;
  var currentPosition = position;

  try {
    var isOutOfRange = isOutOfLimit(position, size);
    instructions.forEach(function (instruction, i) {
      if (!isOutOfRange(currentPosition)) {
        console.log(currentPosition);
        currentPosition = instructionsMap[instruction](currentPosition);
      } else {
        currentPosition.lost = true;
      }
    });
    console.log('Final position', currentPosition);
  } catch (e) {
    console.log(e);
  }

  return currentPosition;
};

module.exports = {
  move: moveAlien
}; //"instructions": ["R", "F","R", "F","R", "F", "R", "F"]
//["F","R","R","F","L","L","F","F","R","R","F","L","L"]