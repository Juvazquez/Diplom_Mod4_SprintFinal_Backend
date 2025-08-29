import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    nombreComun: { 
        type: String, 
        default: "Desconocido",
        trim: true,
        minlength: [2, "El nombre común del país debe tener al menos 2 caracteres"],
        maxlength: [100, "El nombre común del país no puede tener más de 100 caracteres"]
    },
    nombreOficial: { 
        type: String, 
        unique: true,
        index: true, 
        required: [true, "El nombre oficial del país es obligatorio"], 
        trim: true,
        minlength: [2, "El nombre oficial del país debe tener al menos 2 caracteres"],
        maxlength: [150, "El nombre oficial del país no puede tener más de 150 caracteres"]
    },
    capital: { 
        type: [String], 
        default: ["Desconocido"]
    },
    region: { 
        type: String, 
        default: "Desconocido",
        trim: true
    },
    area: { 
        type: Number, 
        min: [0, "El área no puede ser negativa"] 
    },
    poblacion: { 
        type: Number, 
        min: [0, "La población no puede ser negativa"] 
    },
    idiomas: {
        type: Object, 
    },
    banderas: {
        type: Object,
    },
    mapas: {
        type: Object,
        default: {}
    },
    fronteras: {
        type: [String],
        default: []
    },
    gini: {
        type: Number,
        min: [0, "El índice Gini no puede ser negativo"],
        max: [100, "El índice Gini no puede ser mayor a 100"]
    },
    timezones: {
        type: [String],
        default: ["Desconocido"]
    },
    creador: {
        type: String,
        required: [true, "El nombre del creador es obligatorio"],
        trim: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Pais = mongoose.model('Pais', paisSchema);

export default Pais;
