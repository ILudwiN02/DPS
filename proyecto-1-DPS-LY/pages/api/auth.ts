// Importamos las librerías necesarias para encriptar contraseñas y generar tokens
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Arreglo para simular usuarios almacenados (base de datos en memoria)
const users = [];

// Manejador de la API de autenticación
export default function handler(req, res) {
  if (req.method === "POST") {
    // LOGIN DE USUARIO
    const { username, password } = req.body;

    // Buscar al usuario por nombre de usuario
    const user = users.find(u => u.username === username);

    // Verificar si existe y si la contraseña coincide
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generar token JWT
      const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });
      res.status(200).json({ token });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ error: "Credenciales inválidas" });
    }

  } else if (req.method === "PUT") {
    // REGISTRO DE NUEVO USUARIO
    const { username, password } = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Agregar el nuevo usuario al arreglo simulado
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "Usuario registrado" });
  }
}
