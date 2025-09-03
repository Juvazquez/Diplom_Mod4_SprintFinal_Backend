// validations/profileValidation.mjs
import { body } from "express-validator";

export const validarProfile = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre del perfil es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("avatar")
    .trim()
    .notEmpty().withMessage("El avatar es obligatorio")
    .isURL().withMessage("El avatar debe ser una URL válida")
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)
    .withMessage("El avatar debe ser una imagen con formato jpg, jpeg, png, gif o webp"),
];
