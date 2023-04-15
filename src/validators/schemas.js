const Joi = require("joi-oid");

const userSchema = Joi.object().keys({
  User: Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean().default(false),
  }),
});

const taskSchema = Joi.object().keys({
  Task: Joi.object({
    name: Joi.string().required().min(3),
    finished: Joi.boolean().default(false),
    user: Joi.objectId().required(),
  }),
});

module.exports = {
  userSchema,
  taskSchema,
};
