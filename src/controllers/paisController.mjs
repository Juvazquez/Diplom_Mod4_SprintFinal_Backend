import { validationResult } from "express-validator";
import { obtenerTodosLosPaises, eliminarPaisPorId, obtenerPaisPorId, crearPais, actualizarPais, obtenerPaisPorNombre
  } from '../services/PaisService.mjs';

export async function obtenerPaisPorIdJSON(req, res) {
    try {
        const { id } = req.params; // obtenemos el id de la URL
        const pais = await obtenerPaisPorId(id); // función del modelo/servicio

        if (!pais) {
            return res.status(404).json({ error: "País no encontrado" });
        }

        res.status(200).json(pais);
    } catch (error) {
        console.error("Error al obtener el país:", error.message);
        res.status(500).json({ error: "Error al obtener el país" });
    }
}
export async function obtenerPaisesJSON(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        res.status(200).json(paises);
    } catch (error) {
        console.error('Error al obtener los países:', error.message);
        res.status(500).json({ error: 'Error al obtener los países' });
    }
}
export async function agregarPaisController(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevoPais = await crearPais(req.body);
        res.status(201).json({
            mensaje: "País agregado exitosamente",
            pais: nuevoPais
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el país", error: error.message });
    }
}



export async function eliminarPaisController(req, res) {
    //para ver que usuario elimino mi pais
    console.log("Usuario autenticado que elimina el país:", req.user);
    try {
        const { id } = req.params;
        await eliminarPaisPorId(id);
        res.status(201).json({
            mensaje: "País eliminado exitosamente",
        });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el pais", error: error.message });
    }
}

export async function obtenerPaisPorNombreController(req, res) {
    const { nombre } = req.params;

    try {
        const pais = await obtenerPaisPorNombre(nombre);

        if (!pais) {
            return res.status(404).json({ error: "País no encontrado" });
        }

        res.status(200).json(pais);
    } catch (error) {
        console.error("Error al obtener el país:", error.message);
        res.status(500).json({ error: "Error al obtener el país" });
    }
}

export async function editarPaisController(req, res) {
    if (req.body.capital && typeof req.body.capital === "string") {
        req.body.capital = req.body.capital
            .split(",")
            .map(c => c.trim())
            .filter(Boolean);
    }

    if (req.body.borders && typeof req.body.borders === "string") {
        req.body.borders = req.body.borders
            .split(",")
            .map(b => b.trim())
            .filter(Boolean);
    }

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const paisActualizado = await actualizarPais(id, datosActualizados);

        if (!paisActualizado) {
            return res.status(404).json({ mensaje: "País no encontrado" });
        }


        res.status(200).json({
            mensaje: "País actualizado con éxito",
            pais: paisActualizado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el país",
            error: error.message
        });
    }
}