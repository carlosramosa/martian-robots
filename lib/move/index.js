'use strict';

const redis = require('promise-redis')();
var client = redis.createClient(process.env.REDIS_URL || 'redis://localhost:6379');
// var client = redis.createClient('redis://redis:6379');

const moveToNorth = ({
  x, y, o,
}) => ({
  x, y: y + 1, o
});

const moveToSouth = ({
  x, y, o,
}) => ({
  x, y: y - 1, o
});

const moveToWest = ({
  x, y, o,
}) => ({
  x: x - 1, y, o
});

const moveToEast = ({
  x, y, o,
}) => ({
  x: x + 1, y, o
});

const movementMap = {
  N: moveToNorth,
  S: moveToSouth,
  W: moveToWest,
  E: moveToEast
}

const move = ({
  x, y, o
}) => movementMap[o]({
  x, y, o
});

const turnRightMap = {
  N: 'E',
  W: 'N',
  S: 'W',
  E: 'S',
}

const turnRight = ({
  x, y, o
}) => ({
  x, y, o: turnRightMap[o]
})

const turnLeftMap = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N',
}

const turnLeft = ({
  x, y, o
}) => ({
  x, y, o: turnLeftMap[o]
})

const instructionsMap = {
  L: turnLeft,
  R: turnRight,
  F: move,
}

const isOutOfLimit = (original, size) => (currentPosition) =>
  (original.x !== currentPosition.x && (currentPosition.x > size.x || currentPosition.x < 0))
    || (original.y !== currentPosition.y && (currentPosition.y > size.y || currentPosition.y < 0));


const checkIfIsLost = async (client, positionAux) => {
  console.log('Searching for..', { 'lostCoordinates': { x: positionAux.x, y: positionAux.y}})
  const value = await client.db('mars').collection('movements').findOne({ 'x': positionAux.x, 'y': positionAux.y });
  // Si no se ha perdido ninguno ahí, inserto y lo marco como perdido
  if (!value)
  {
    console.log('Inserting..', { x: positionAux.x, y: positionAux.y})
    await client.db('mars').collection('movements').insertOne({ x: positionAux.x, y: positionAux.y});
    return true;
  }
  return false;
}

const makeMovement = async(position, size, instructions) => {
  const isOutOfRange = isOutOfLimit(position, size);
  let currentPosition = {...position};
  const res = [];
  for(const instruction of instructions){
    if (!currentPosition.lost){
      console.log(currentPosition);
      let positionAux =  instructionsMap[instruction](currentPosition);
      if (!isOutOfRange(positionAux)){
        currentPosition = positionAux;
        res.push(currentPosition);
      } else {
        const value = await client.get(JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }));
        console.log(value);
        if (!value) {
          currentPosition.lost = true;
          await client.set(JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }), true);
        }
      }

    };
  };
}

const moveAlien = async ({
  size,
  movements,
}) => {
  // const a = await client.get(`${size.x}${size.y}`);
  // await client.set(`${size.x}${size.y}`, 'hola');
  // const asd = await client.get(`${size.x}${size.y}`);
  const res = []
  for(const { position, instructions } of movements) {
    res.push(await makeMovement(position, size, instructions));
  }
  return res;
  // return Promise.all(movements.map(({ position, instructions }) =>
  //   makeMovement(position, size, instructions, client)
  // ));
}

module.exports = {
  move: moveAlien,
}
    //"instructions": ["R", "F","R", "F","R", "F", "R", "F"] --> 1,1,
    //["F","R","R","F","L","L","F","F","R","R","F","L","L"]
    //"instructions": ["L","L","F","F","F","L","F","L","F","L"]
