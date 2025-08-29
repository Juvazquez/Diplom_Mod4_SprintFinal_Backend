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
import {authenticateToken, hasPermission } from '../middleware/authenticationMiddleware.mjs';

const router = express.Router();

// CRUD
//Verificamos si el usuario tiene acceso 
//y luego verificamos si tiene permisos 
router.get("/", authenticateToken,hasPermission("read:paises"), obtenerPaisesJSON);
router.get("/:id", authenticateToken, hasPermission("read:paises"), obtenerPaisPorIdJSON);
router.get("/nombre/:nombre", authenticateToken, hasPermission("read:paises"), obtenerPaisPorNombreController);
router.post('/agregar', authenticateToken, hasPermission("create:paises"), normalizarPais, validarPais, agregarPaisController);
router.delete('/eliminar/:id', authenticateToken, hasPermission("delete:paises"), eliminarPaisController);
router.put('/editar/:id', authenticateToken, hasPermission("update:paises"), normalizarPais, validarPais, editarPaisController);

export default router;
