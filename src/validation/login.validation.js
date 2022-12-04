import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string().max(255).email().required(),
  /* password must contain at least one lowercase letter, one uppercase letter, at least one digit, and minimum 8 characters */
  /* allows special characters */
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
};

export default loginSchema;
