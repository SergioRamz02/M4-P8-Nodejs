//Gestor de Notas

const fs = require('fs');

// Ruta del archivo de notas
const filePath = './notas.json';

// Agregar notas
function agregarNota(titulo, contenido) {
  let notas = [];
  if (fs.existsSync(filePath)) {

    const data = fs.readFileSync(filePath, 'utf8');
    notas = JSON.parse(data);
  }

  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);


  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2), 'utf8');
  console.log('Nota agregada con éxito.');
}

//Enlistar todas las notas
function listarNotas() {
  if (fs.existsSync(filePath)) {

    const data = fs.readFileSync(filePath, 'utf8');
    const notas = JSON.parse(data);

    if (notas.length === 0) {
      console.log('No hay notas guardadas.');
    } else {
      console.log('Notas guardadas:');
      notas.forEach((nota, index) => {
        console.log(`${index + 1}. ${nota.titulo}: ${nota.contenido}`);
      });
    }
  } else {
    console.log('No hay notas guardadas.');
  }
}

/*Elimina una nota por su título*/
function eliminarNota(titulo) {
  if (fs.existsSync(filePath)) {

    const data = fs.readFileSync(filePath, 'utf8');
    let notas = JSON.parse(data);

    //Filtra las notas y elimina la que coincida con el título.
    const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);

    // Sobrescribe el archivo con las notas actualizadas.
    fs.writeFileSync(filePath, JSON.stringify(notasRestantes, null, 2), 'utf8');
    console.log(`Nota con título "${titulo}" eliminada.`);
  } else {
    console.log('No hay notas para eliminar.');
  }
}

// Ejecución de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
listarNotas();
eliminarNota('Compras');
listarNotas();
//Ejemplo extra
agregarNota('Tarea', 'Leer un libro en esta semana.');
listarNotas();