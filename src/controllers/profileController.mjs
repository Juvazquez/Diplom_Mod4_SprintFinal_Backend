import { validationResult } from "express-validator";
import {
  obtenerTodosLosProfiles,
  obtenerProfilePorId,
  crearProfile,
  actualizarProfile,
  eliminarProfilePorId,
} from "../services/profileService.mjs";

// GET: obtener todos los perfiles
export async function obtenerProfilesJSON(req, res) {
  try {
    const profiles = await obtenerTodosLosProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error al obtener los perfiles:", error.message);
    res.status(500).json({ error: "Error al obtener los perfiles" });
  }
}

// GET: obtener perfil por ID
export async function obtenerProfilePorIdJSON(req, res) {
  try {
    const { id } = req.params;
    const profile = await obtenerProfilePorId(id);

    if (!profile) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error al obtener el perfil:", error.message);
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
}

// POST: crear perfil
export async function agregarProfileController(req, res) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const nuevoProfile = await crearProfile(req.body);
    res.status(201).json({
      mensaje: "Perfil creado exitosamente",
      profile: nuevoProfile,
    });
  } catch (error) {
    console.error("Error al crear el perfil:", error.message);
    res.status(500).json({ mensaje: "Error al crear el perfil", error: error.message });
  }
}

// PUT: actualizar perfil

export async function editarProfileController(req, res) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const profileActualizado = await actualizarProfile(id, datosActualizados);

    if (!profileActualizado) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }

    res.status(200).json({
      mensaje: "Perfil actualizado con éxito",
      profile: profileActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error.message);
    res.status(500).json({ mensaje: "Error al actualizar el perfil", error: error.message });
  }
}

// DELETE: eliminar perfil
export async function eliminarProfileController(req, res) {
  console.log("Usuario autenticado que elimina el perfil:", req.user);

  try {
    const { id } = req.params;
    await eliminarProfilePorId(id);

    res.status(200).json({
      mensaje: "Perfil eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el perfil:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar el perfil", error: error.message });
  }
}
