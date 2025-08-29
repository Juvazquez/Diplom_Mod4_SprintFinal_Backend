import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import router from './src/routes/index.mjs';   // ✅ Importás el index de rutas
import path from "path";
import methodOverride from 'method-override';
import { cargarPaises } from './src/services/PaisService.mjs'; 
import dotenv from "dotenv";
import PaisRepository from './src/repositories/PaisRepository.mjs';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// 🔹 Configuración de CORS
app.use(cors({
  origin: process.env.ALLOW_ORIGINS?.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Knowledge-Base'],
  credentials: true,
  maxAge: 86400 // 1 día en segundos
}));

async function startServer() {
    try {
        await connectDB();

        // Si no hay países cargados en la DB, inicializarlos
        const count = await PaisRepository.contar();
        if (count === 0) {
            await cargarPaises();
        }

        // Middlewares
        app.use(express.urlencoded({ extended: true }));
        app.use(methodOverride('_method'));
        app.use(express.static(path.join(process.cwd(), "public")));

        // 🔹 Rutas API
        app.use('/api', router);

        // endpoint health
        app.get('/health', (req, res) => {
            res.status(200).json({ status: 'OK', message: 'El servidor está funcionando correctamente.', timeStamp: new Date() });
        });

        // Ruta raíz de bienvenida
        app.get('/', (req, res) => {
            res.json({ message: 'Bienvenido al backend de Paises 🌍' });
        });

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
    }
}

startServer();
