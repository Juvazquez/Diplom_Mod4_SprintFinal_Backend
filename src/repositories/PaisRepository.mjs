import Pais from '../models/Pais.mjs';
import IRepository from './IRepository.mjs';

class PaisRepository extends IRepository {

    async  guardarPais(pais) {
        const nuevoPais = new Pais(pais);
        return await nuevoPais.save();
    }
    async existePais(nombreOficial) {
        return await Pais.exists({ nombreOficial });
    }

    async obtenerTodos() {
        return await Pais.find({ nombreOficial: { $exists: true } });
        //Busca en la colección solamente los documentos(paises) que tienen el campo nombreOficial.

    }
    async eliminarPais(id) {
        return await Pais.findByIdAndDelete(id);
    }
    
    async obtenerPorId(id) {
        return await Pais.findById(id);
    }
    async actualizarPais(id, datosActualizados) {
        return await Pais.findByIdAndUpdate(id, datosActualizados, { new: true });
    }
    async crearPais(datos) {
        const nuevoPais = new Pais(datos);
        return await nuevoPais.save();
    }
    async contar() {
        return await Pais.countDocuments();
    }

    async obtenerPorNombre(nombre) {
        return await Pais.findOne({ nombreComun: nombre });
    }
}


export default new PaisRepository();
