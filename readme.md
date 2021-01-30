# Introduction

The surface of Mars can be modelled by a rectangular grid around which robots are
able to move according to instructions provided from Earth. You are to write a program
that determines each sequence of robot positions and reports the final position of the
robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed
by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west). A robot
instruction is a string of the letters "L", "R", and "F" which represent, respectively, the
instructions:
- Left: the robot turns left 90 degrees and remains on the current grid point.
- Right: the robot turns right 90 degrees and remains on the current grid point.
- Forward: the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x,
y+1).

There is also a possibility that additional command types may be required in the future
and provision should be made for this.
Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that
moves "off" an edge of the grid is lost forever. However, lost robots leave a robot "scent"
that prohibits future robots from dropping off the world at the same grid point. The scent
is left at the last grid position the robot occupied before disappearing over the edge. An
instruction to move "off" the world from a grid point from which a robot has been
previously lost is simply ignored by the current robot.

Each robot is processed sequentially, i.e., finishes executing the robot instructions
before the next robot begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.

## SOLUTION

It has been developed a script with `inquirer` and an API.
The API has been deployed on Heroku.

## END POINTS
### POST ROBOT MOVEMENT
```http
POST http://localhost:3000/movements
```
You must send:
- size: mars ground size
- movements: a list of movements with the initial position

#### Example
```http
POST http://localhost:3000/movements
```
```json
body: {
    "size": {
        "x": 5,
        "y": 3
    },
    "movements": [
        {
            "position": {
                "x": 1,
                "y": 1,
                "o": "E"
            },
            "instructions": [
                "R",
                "F",
                "R",
                "F",
                "R",
                "F",
                "R",
                "F"
            ]
        },
        {
            "position": {
                "x": 3,
                "y": 2,
                "o": "N"
            },
            "instructions": [
                "F",
                "R",
                "R",
                "F",
                "L",
                "L",
                "F",
                "F",
                "R",
                "R",
                "F",
                "L",
                "L"
            ]
        },
        {
            "position": {
                "x": 0,
                "y": 3,
                "o": "W"
            },
            "instructions": [
                "L",
                "L",
                "F",
                "F",
                "F",
                "L",
                "F",
                "L",
                "F",
                "L"
            ]
        }
    ]
}
```

Response: 
```json
[
    {
        "x": 1,
        "y": 1,
        "o": "E",
        "lost": false
    },
    {
        "x": 3,
        "y": 2,
        "o": "N",
        "lost": false
    },
    {
        "x": 2,
        "y": 3,
        "o": "S",
        "lost": false
    }
]
```
### GET ROBOTS MOVEMENT

```http
GET http://localhost:3000/movements?${lost}
```

You could send:
- lost: true | false (optional)

#### Example

```http
GET http://localhost:3000/movements
```

Response: 
```json
[
    {
        "_id": "60142e71942d5d60e9caae41",
        "movements": [
            {
                "x": 1,
                "y": 1,
                "o": "S",
                "lost": false
            },
            {
                "x": 1,
                "y": 0,
                "o": "S",
                "lost": false
            },
            {
                "x": 1,
                "y": 0,
                "o": "W",
                "lost": false
            },
            {
                "x": 0,
                "y": 0,
                "o": "W",
                "lost": false
            },
            {
                "x": 0,
                "y": 0,
                "o": "N",
                "lost": false
            },
            {
                "x": 0,
                "y": 1,
                "o": "N",
                "lost": false
            },
            {
                "x": 0,
                "y": 1,
                "o": "E",
                "lost": false
            },
            {
                "x": 1,
                "y": 1,
                "o": "E",
                "lost": false
            }
        ],
        "lost": false,
        "totalSteps": 8
    },
```

### GET EXPLORED TERRITORY

```http
GET http://localhost:3000/explored-territory?${status}
```

You could send:
- status: explored | failed (optional)

#### Example

```http
GET http://localhost:3000/explored-territory?status=failed
```

Response: 
```json
[
    {
        "_id": "60154ad5bc06500015c5ca9f",
        "status": "failed",
        "x": 1,
        "y": 1
    },
    {
        "_id": "60154ad5bc06500015c5caa1",
        "status": "failed",
        "x": 0,
        "y": 3
    },
```
## TESTING
You could run `npm run test` in order to execute all tests

## RUN

You could use:
- Script inquirer: `npm run script`
- Local environment: `npm run start`
- Docker environment: `npm run start-docker`
Default port is 3000

## DEPLOYMENT

API is deployed on Heroku.
- URL: `https://martian-robots-cra.herokuapp.com/`


