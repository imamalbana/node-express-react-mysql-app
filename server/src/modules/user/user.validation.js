import Joi from "joi";

export const profileSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name cannot exceed 50 characters",
      "string.base": "Full name must be a string",
    })
    .optional(),

  email: Joi.string()
    .email()
    .messages({
      "string.email": "Email must be a valid email address",
      "string.base": "Email must be a string",
    })
    .optional(),

  address: Joi.string()
    .max(200)
    .messages({
      "string.max": "Address cannot exceed 200 characters",
      "string.base": "Address must be a string",
    })
    .optional(),

  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(15)
    .messages({
      "string.pattern.base": "Phone must contain only digits",
      "string.min": "Phone must be at least 6 digits",
      "string.max": "Phone cannot exceed 15 digits",
      "string.base": "Phone must be a string",
    })
    .optional(),
});
