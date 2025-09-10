// src/modules/user/user.validation.js
import Joi from "joi";

export const profileSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).optional().messages({
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name cannot exceed 50 characters",
  }),

  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address",
  }),

  address: Joi.string().max(200).optional().messages({
    "string.max": "Address cannot exceed 200 characters",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(15)
    .optional()
    .messages({
      "string.pattern.base": "Phone must contain only digits",
      "string.min": "Phone must be at least 6 digits",
      "string.max": "Phone cannot exceed 15 digits",
    }),
});
