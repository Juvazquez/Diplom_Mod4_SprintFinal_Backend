// Middleware de autenticación y autorización

import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import Role from "../models/Role.mjs"; // Importante para que Mongoose registre Role
import Permission from "../models/Permission.mjs"; // 👈 Importa Permission para registrar el schema
//si no lo pongo me salta problema en el servidor 
// Middleware para verificar el token de autenticación
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};


// Middleware para verificar permisos
export const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
      }

      // Buscar usuario con su rol y permisos poblados
      const user = await User.findById(req.user.id)
        .populate({
          path: "role",
          populate: {
            path: "permissions", // Mongoose ya sabe que es el modelo Permission porque lo importamos
          },
        });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      console.log("Permisos poblados:", user.role?.permissions);

      // Validar si tiene el permiso requerido
      const hasPermission = user.role.permissions.some(
        (permission) => permission.name === requiredPermission
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: "No tienes permiso para realizar esta acción",
        });
      }

      next(); // Permitir acceso
    } catch (error) {
      console.error("Error en autorización:", error.message, error.stack);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
};
