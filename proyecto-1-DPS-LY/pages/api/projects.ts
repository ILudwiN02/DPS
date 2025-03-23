// Simulamos una base de datos en memoria con algunos proyectos iniciales
let projects = [
  { id: 1, name: "Proyecto 1", tasks: [] },
  { id: 2, name: "Proyecto 2", tasks: [] }
];

// Manejador de API para proyectos
export default function handler(req, res) {
  if (req.method === "GET") {
    // Devuelve todos los proyectos existentes
    res.status(200).json(projects);
  } else if (req.method === "POST") {
    // Crea un nuevo proyecto con los datos recibidos en el body
    const newProject = {
      id: projects.length + 1,
      name: req.body.name,
      tasks: []
    };
    projects.push(newProject);
    res.status(201).json(newProject);
  }
}
