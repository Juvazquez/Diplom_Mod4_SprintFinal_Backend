import express from 'express';
import { validarPais } from "../validations/paisValidation.mjs";
import { normalizarPais } from "../validations/paisParser.mjs";

import {
    agregarPaisController,
    editarPaisController,
    eliminarPaisController,
    obtenerPaisesJSON,
    obtenerPaisPorIdJSON,
    obtenerPaisPorNombreController
} from '../controllers/paisController.mjs';
import { authenticateToken, hasPermission } from '../middleware/authenticationMiddleware.mjs';

const router = express.Router();

// ✅ Públicos (no necesitan login)
router.get("/", obtenerPaisesJSON);
router.get("/:id", obtenerPaisPorIdJSON);
router.get("/nombre/:nombre", obtenerPaisPorNombreController);

// 🔒 Protegidos (requieren login + permisos)
router.post(
  '/agregar',
  authenticateToken,
  hasPermission("create:paises"),
  normalizarPais,
  validarPais,
  agregarPaisController
);

router.delete(
  '/eliminar/:id',
  authenticateToken,
  hasPermission("delete:paises"),
  eliminarPaisController
);

router.put(
  '/editar/:id',
  authenticateToken,
  hasPermission("update:paises"),
  normalizarPais,
  validarPais,
  editarPaisController
);

export default router;
