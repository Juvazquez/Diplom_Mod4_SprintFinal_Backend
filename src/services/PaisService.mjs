import axios from 'axios';
import PaisRepository from '../repositories/PaisRepository.mjs';


// URL de la API pública
const API_URL = "https://restcountries.com/v3.1/region/Americas?fields=name,capital,region,area,population,languages,flags,maps,borders,gini,timezones";


// Función para consumir la API, procesar datos y guardar en MongoDB
export async function cargarPaises() {
    try {
        // 1. Consumir API
        const response = await axios.get(API_URL);
        const paises = response.data; // Estás extrayendo solo los datos útiles 

        // 2. Filtrar países que tengan idioma español
        const paisesEspanol = paises.filter(pais => 
            pais.languages && Object.keys(pais.languages).includes('spa')
        );

        // 3. Procesar cada país para que cumpla con el esquema
        const paisesProcesados = paisesEspanol.map(pais => {
            const giniValue = pais.gini ? Object.values(pais.gini)[0] : undefined;

            return {
                nombreComun: pais.name?.common || "Desconocido",
                nombreOficial: pais.name?.official || "Desconocido",
                capital: pais.capital || ["Desconocido"],
                region: pais.region || "Desconocida",
                area: pais.area || 0,
                poblacion: pais.population || 0,
                idiomas: pais.languages || {},
                banderas: pais.flags || {},
                mapas: pais.maps || {},
                fronteras: pais.borders || [],
                gini: giniValue,
                timezones: pais.timezones || ["Desconocido"],
                creador: "Julian"
            };
        });

        // 4. Filtrar solo países válidos para prevenir errores
        const paisesValidos = paisesProcesados.filter(p => 
            p.nombreComun && 
            p.nombreOficial && 
            Object.keys(p.idiomas || {}).length > 0 && 
            Object.keys(p.banderas || {}).length > 0
        );

        // 5. Guardar en la base de datos
        for (const pais of paisesValidos) {
            const existe = await PaisRepository.existePais(pais.nombreOficial);
            if (!existe) {
                await PaisRepository.guardarPais(pais);
            }
        }

        console.log('Paises cargados correctamente en MongoDB');

    } catch (error) {
        console.error('Error cargando países:', error.message);
    }
}

export async function obtenerTodosLosPaises() {
    return await PaisRepository.obtenerTodos();
}

export async function eliminarPaisPorId(id) {
    return await PaisRepository.eliminarPais(id);
}

export async function obtenerPaisPorId(id) {
    return await PaisRepository.obtenerPorId(id);
}
export async function actualizarPais(id, datosActualizados) {
    return await PaisRepository.actualizarPais(id, datosActualizados);
}
export async function crearPais(datos) {
    return await PaisRepository.crearPais(datos);
}
export async function obtenerPaisPorNombre(nombre) {
    return await PaisRepository.obtenerPorNombre(nombre);
}