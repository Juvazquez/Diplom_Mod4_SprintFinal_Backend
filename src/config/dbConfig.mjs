import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carga variables del archivo .env

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
  console.log("MONGO_URI desde .env:", process.env.MONGO_URI);

}
