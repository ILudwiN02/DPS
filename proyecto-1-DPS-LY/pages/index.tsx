// Importamos los hooks necesarios y librerías
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Componente principal de la página de inicio
export default function Home() {
  // Estado para almacenar la lista de proyectos
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  // useEffect se ejecuta una vez al cargar la página para obtener los proyectos desde la API
  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
  }, []);

  // Renderiza la UI
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestión de Proyectos</h1>
      {/* Botón para ir a la página de login */}
      <button onClick={() => router.push('/auth/login')} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Iniciar Sesión
      </button>

      {/* Lista de proyectos */}
      <div className="grid gap-4 mt-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded shadow-md">
            <h2 className="text-xl">{project.name}</h2>
            {/* Botón para ver detalles del proyecto */}
            <button onClick={() => router.push(`/projects/${project.id}`)} className="text-blue-500">
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
