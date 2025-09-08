import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    "string.base": "Username harus berupa teks",
    "string.empty": "Username tidak boleh kosong",
    "string.min": "Username minimal 3 karakter",
    "string.max": "Username maksimal 20 karakter",
    "any.required": "Username wajib diisi",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .min(6)
    .required()
    .messages({
      "string.pattern.base": "Password hanya boleh huruf atau angka",
      "string.empty": "Password tidak boleh kosong",
      "string.min": "Password minimal 6 karakter",
      "any.required": "Password wajib diisi",
    }),
  role: Joi.string()
    .valid("USER", "ADMIN") // hanya menerima USER atau ADMIN
    .default("USER"),
});

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username tidak boleh kosong",
    "string.alphanum": "Username hanya boleh huruf dan angka",
    "string.min": "Username minimal 3 karakter",
    "string.max": "Username maksimal 30 karakter",
    "any.required": "Username wajib diisi",
  }),
  password: Joi.string().min(6).max(128).required().messages({
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 6 karakter",
    "string.max": "Password maksimal 128 karakter",
    "any.required": "Password wajib diisi",
  }),
});
