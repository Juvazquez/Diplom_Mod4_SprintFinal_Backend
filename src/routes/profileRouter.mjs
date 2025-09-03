import express from "express";
import {
  obtenerProfilesJSON,
  obtenerProfilePorIdJSON,
  agregarProfileController,
  editarProfileController,
  eliminarProfileController,
} from "../controllers/profileController.mjs";

import { validarProfile } from "../validations/profileValidation.mjs";
import { authenticateToken } from "../middleware/authenticationMiddleware.mjs";

const router = express.Router();

router.get("/", authenticateToken, obtenerProfilesJSON);
router.get("/:id", authenticateToken, obtenerProfilePorIdJSON);

router.post(
  "/",
  authenticateToken,
  validarProfile,
  agregarProfileController
);

router.put(
  "/:id",
  authenticateToken,
  validarProfile,
  editarProfileController
);

router.delete(
  "/:id",
  authenticateToken,
  eliminarProfileController
);

export default router;
