import Joi from "joi-browser";

const resetPasswordSchema = {
  /* password must contain at least one lowercase letter, one uppercase letter, one digit, and minimum 8 characters. It allows special characters */
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
};

export default resetPasswordSchema;
