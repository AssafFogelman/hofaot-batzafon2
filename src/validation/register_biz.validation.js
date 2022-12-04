import Joi from "joi-browser";

const businessRegisterationSchema = {
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  /* password must contain at least one lowercase letter, one uppercase letter, at least one digit, and minimum 8 characters */
  /* allows special characters */
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  biz: Joi.boolean().required(),
  phone: Joi.string()
    .min(2)
    .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/)
    .required(),
  bizUrl: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
  wazeLocation: Joi.string()
    .min(15)
    .regex(/^https:\/\/(www\.|)waze\.com\/.*?/),
};

export default businessRegisterationSchema;
