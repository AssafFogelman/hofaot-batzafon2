import Joi from "joi-browser";

const userRegisterSchema = {
  /* the regex allows hebrew characters, english characters, and requires at least one space */
  name: Joi.string()
    .min(2)
    .max(255)
    .regex(
      /^([A-Za-z\u0590-\u05fe\u200f\u200e-]{2,16})[ ]([A-Za-z\u0590-\u05fe\u200f\u200e-]{2,16})?([ ]{0,1})?([A-Za-z\u0590-\u05fe\u200f\u200e-]{2,16})?([ ]{0,1})?([A-Za-z\u0590-\u05fe\u200f\u200e-]{2,16})/
    )
    .required(),
  /* must be at least two words */
  email: Joi.string().min(6).max(255).required().email(),
  /* password must contain at least one lowercase letter, one uppercase letter, at least one digit, and minimum 8 characters */
  /* allows special characters */
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  biz: false,
};

export default userRegisterSchema;
