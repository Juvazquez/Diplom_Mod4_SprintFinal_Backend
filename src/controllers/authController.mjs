// src/controllers/authController.mjs
import AuthService from '../services/AuthService.mjs';

export const register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en registro:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error) {
    console.log('Error en login:', error);
    res.status(401).json({ message: error.message });
  }
};
