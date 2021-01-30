const { Joi } = require('express-validation');

const instructionSchema = Joi.string().valid('L', 'R', 'F');

const coordSchema = Joi.number().min(0).max(50);

const movementSchema = Joi.array().items(
	Joi.object({
		position: Joi.object({
			x: coordSchema,
			y: coordSchema,
			o: Joi.string().valid('N', 'S', 'W', 'E')
		}),
		instructions: Joi.array().items(instructionSchema).min(1).max(100),
	})
);

const movementsSchema = Joi.object({
	size: Joi.object({
		x: coordSchema,
		y: coordSchema,
	}).required(),
	movements: movementSchema.required(),
});

const postMovementsSchema = {
	body: movementsSchema,
};

const getMovementsSchema = {
	query: Joi.object({
		lost: Joi.bool()
	})
};

module.exports = {
	postMovementsSchema,
	getMovementsSchema,
};
