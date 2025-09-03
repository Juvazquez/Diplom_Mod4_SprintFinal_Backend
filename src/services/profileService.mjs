// Ejemplo con Mongoose
import Profile from "../models/Profile.mjs";

export async function obtenerTodosLosProfiles() {
  return await Profile.find();
}

export async function obtenerProfilePorId(id) {
  return await Profile.findById(id);
}

export async function crearProfile(data) {
  const nuevoProfile = new Profile(data);
  return await nuevoProfile.save();
}

export async function actualizarProfile(id, datosActualizados) {
  return await Profile.findByIdAndUpdate(id, datosActualizados, { new: true });
}

export async function eliminarProfilePorId(id) {
  return await Profile.findByIdAndDelete(id);
}
