// Importamos los hooks necesarios y librerías
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Componente de inicio de sesión
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Función que maneja el inicio de sesión
  const handleLogin = async () => {
    try {
      // Se envían las credenciales al backend
      const res = await axios.post("/api/auth", { username, password });
      // Se guarda el token en localStorage para futuras peticiones autenticadas
      localStorage.setItem("token", res.data.token);
      // Redirige a la página principal
      router.push("/");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Iniciar Sesión</h1>
      {/* Campo de entrada para el nombre de usuario */}
      <input
        className="border p-2 w-full"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Campo de entrada para la contraseña */}
      <input
        className="border p-2 w-full mt-2"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Botón para iniciar sesión */}
      <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}
