const NodeCache = require( "node-cache" );
const client = new NodeCache(( { stdTTL: 60000000 } ));



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


const moveAlien = async ({
  size,
  movements,
}) => {
  await client.flushAll()
  // const a = await client.get(`${size.x}${size.y}`);
  // await client.set(`${size.x}${size.y}`, 'hola');
  // const asd = await client.get(`${size.x}${size.y}`);
  const results = [];
    movements.forEach(async({ position, instructions }, j) => {
    let currentPosition = position;
    currentPosition.lost = false;

      const isOutOfRange = isOutOfLimit(position, size);
      instructions.forEach(async(instruction, i) => {
        if (!currentPosition.lost){
          console.log(currentPosition);
          let positionAux =  instructionsMap[instruction](currentPosition);
          if (!isOutOfRange(positionAux)){
            currentPosition = positionAux;
          } else {
            const ad = `${positionAux.x}${positionAux.y}`;
            const value = client.get(ad);
            console.log(value);
            if (!value) {
              currentPosition.lost = true;
              client.set(`${positionAux.x}${positionAux.y}`, 'hola');
            }
            
          }
        }
      })
      results.push(currentPosition);
      console.log('Final position', currentPosition);
    });


  return results;
}

module.exports = {
  move: moveAlien,
}
    //"instructions": ["R", "F","R", "F","R", "F", "R", "F"] --> 1,1,
    //["F","R","R","F","L","L","F","F","R","R","F","L","L"]
    //"instructions": ["L","L","F","F","F","L","F","L","F","L"]
