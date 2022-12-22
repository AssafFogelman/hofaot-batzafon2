import Joi from "joi-browser";

const forgotPasswordSchema = {
  email: Joi.string().max(255).email().required().trim(),
};

export default forgotPasswordSchema;
