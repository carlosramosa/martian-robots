const { Joi } = require('express-validation');

const getTerritoryExploredSchema = {
	query: Joi.object({
		status: Joi.string().valid('explored', 'failed')
	})
};

module.exports = {
	getTerritoryExploredSchema,
};
