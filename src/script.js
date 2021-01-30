const inquirer = require('inquirer');
const { makeRobotMove } = require('./lib/movements/generate-robot-movement');
const { movementsSchema } = require('./schemas/movements')
const redis = require('./lib/redis');
redis.getConnection()

const { Connection } = require('./lib/mongo')

Connection.connectToMongo()

const collectInputs = async (inputs = []) => {
  const prompts = [
    {
      type: 'input',
      name: 'position',
      message: "Insert initial position",
      validate: (value) =>
        value.length >= 5 && value.length <= 7 || 'Min length 5, Max length 7',
    },
    {
      type: 'input',
      name: 'instructions',
      message: "Insert movements",
      validate: (value) =>
        value.length >= 1 && value.length <= 50 || 'Min length 1, Max length 50',
    },
    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another robot? ',
      default: true
    }
  ];

  const { again, ...answers } = await inquirer.prompt(prompts);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

(async () =>
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'size',
        message: "Insert size",
        validate: (value) => value.length >= 3 && value.length <= 5 || 'Min length 3, Max length 5',
      },
    ])
    .then(async({ size }) => {
      const movementsInstructions = await collectInputs();
      const movements = generateParams(movementsInstructions);
      const [ x, y ] = size.split(' ');
      const params = {
        size: { x: x.trim(), y: y.trim() },
        movements,
      };
      const { error } = movementsSchema.validate(params);
      if (error) {
        console.error(error)
        process.exit(1);
      }
      const res = await makeRobotMove(params);
      console.log(res);
      process.exit(0);
    })
    .catch(error => {
      console.error('Error processing input. Please, read the README');
      process.exit(1);
    })
)();

  const generateParams = (movements) => movements.map(({ position, instructions }) => {
    const [ x, y, o ] = position.split(' ');
    return {
      position: {
        x: x.trim(),
        y: y.trim(),
        o: o.trim()
      },
      instructions: instructions.split('').map((instruction) => instruction.trim()),
    }
  });
