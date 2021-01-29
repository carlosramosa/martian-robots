const { getAllMovements } = require('../../lib/movenments/robot-movements')
/* GET users listing. */
const getMovements =  async (req, res, next) => {
  const result = await getAllMovements();
  res.send(result);
};

module.exports = getMovements;
