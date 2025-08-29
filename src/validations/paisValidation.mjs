import { body } from "express-validator";

export const validarPais = [
    body("nombreOficial")
        .trim()
        .notEmpty().withMessage("El nombre oficial es obligatorio")
        .isLength({ min: 3, max: 90 }).withMessage("El nombre oficial debe tener entre 3 y 90 caracteres"),

    body("capital")
        .isArray({ min: 1 }).withMessage("La capital debe ser un array y contener al menos un elemento")
        .custom((capitales) => {
            for (let capital of capitales) {
                if (typeof capital !== "string" || capital.trim().length < 3 || capital.trim().length > 90) {
                    throw new Error("Cada capital debe ser un texto entre 3 y 90 caracteres");
                }
            }
            return true;
        }),

    body("fronteras")
        .optional() // porque no todos los países tienen fronteras
        .isArray().withMessage("Fronteras debe ser un array")
        .custom((borders) => {
            for (let border of borders) {
                if (!/^[A-Z]{3}$/.test(border)) {
                    throw new Error("Cada código de frontera debe ser exactamente 3 letras mayúsculas");
                }
            }
            return true;
        }),

    body("area")
        .notEmpty().withMessage("El área es obligatoria")
        .isFloat({ gt: 0 }).withMessage("El área debe ser un número positivo"),

    body("poblacion")
        .notEmpty().withMessage("La población es obligatoria")
        .isInt({ gt: 0 }).withMessage("La población debe ser un número entero positivo"),

    body("gini")
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage("El índice Gini debe ser un número entre 0 y 100"),
];
