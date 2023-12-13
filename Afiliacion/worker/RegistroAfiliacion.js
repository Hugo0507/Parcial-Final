import { Client, Variables, logger } from "camunda-external-task-client-js";
import { writeFile } from 'fs/promises';

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };


// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'Registro'
client.subscribe("Registro", async function ({ task, taskService }) {


  const Nombre = task.variables.get("Nombre");
  const Cedula = task.variables.get("Cedula");
  const Aporte = task.variables.get("Aporte")+"%";
  const Regimen = task.variables.get("Regimen");
  const Sueldo = task.variables.get("Sueldo");

  // const nombre = "HugoMondragon"
// Crear un objeto con las variables
const data = {
  Nombre: Nombre,
  Cedula: Cedula,
  Aporte: Aporte,
  Regimen: Regimen,
  Sueldo: Sueldo
};

// const variables = new Variables();
// variables.set("nombre", nombre);

// Convertir el objeto a formato JSON
const jsonData = JSON.stringify(data);

// Nombre del archivo será el valor de la variable 'Nombre'
const fileName = `${Nombre}.json`;

// Ruta completa al archivo
const filePath = `./${fileName}`;

// Escribir el JSON en el archivo
try {
  await writeFile(filePath, jsonData, 'utf8');
  console.log(`El JSON se ha guardado correctamente en ${filePath}`);
} catch (error) {
  console.error('Error al escribir el archivo:', error);
}

  await taskService.complete(task);
});