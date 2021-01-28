const { Joi } = require("express-validation");

const movementSchema = Joi.array().items(
  Joi.object({
    position: Joi.object({
      x: Joi.number(),
      y: Joi.number(),
      o: Joi.string()
    }),
    instructions: Joi.array().items(Joi.string()),
  })
);

const moveSchema = {
  body: Joi.object({
    size: Joi.object({
      x: Joi.number(),
      y: Joi.number(),
    }),
    movements: movementSchema,
  }),
}

module.exports = {
  moveSchema,
};
