//servicio para autenticar mi usuario
//antes se debe instalar la libreria npm install bcryptjs jsonwebtoken
// versión ESM usando import
import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Role from "../models/Role.mjs";


class AuthService {
  // Método para registrar un nuevo usuario
  async register(userData) {
    // Verificamos si ya existe un usuario con el mismo email o username
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }]
    });

    if (existingUser) {
      throw new Error("Usuario o email ya existe");
    }

    // Encriptamos la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    //Buscamos roles por defecto: 
    const defaultRole = await Role.findOne({ name: 'user' });
    if (!defaultRole) {
      throw new Error("Rol por defecto no encontrado");
    }

    // Creamos el usuario con la contraseña encriptada
    const user = new User({
      ...userData,
      password: hashedPassword,
      role: defaultRole._id
    });

    await user.save();

    // Convertimos el documento mongoose a objeto plano
    const userResponse = user.toObject();
    delete userResponse.password; // Nunca devolvemos la contraseña

    // Generamos un token JWT
    const token = this.generateToken(user);

    // Retornamos el usuario (sin password) y su token
    return { user: userResponse, token };
    
  }

  // Método auxiliar para generar tokens JWT
  generateToken(user) {
    return jwt.sign(
      { id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET, // clave secreta definida en .env
      { expiresIn: "24h" }    // el token expira en 24 horas

    );
  }
  // Método para iniciar sesión
async login(email, password) {
  // Buscamos el usuario por email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Verificamos si la contraseña es correcta
  //le pasamos la contraseña plana del usuario y la contaseña hasheada
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Correo o Contraseña incorrecta");
  }

  //una vez q validamos si la contrase es correcta o no
  //devolvemos la respuesta al usuario

  // Convertimos el usuario a objeto plano y eliminamos la contraseña hasheada
  const userResponse = user.toObject();
  delete userResponse.password;

  // Generamos un nuevo token y retornamos la respuesta
  const token = this.generateToken(user);
  return { user: userResponse, token };
}

}

// Exportamos instancia única del servicio
export default new AuthService();
