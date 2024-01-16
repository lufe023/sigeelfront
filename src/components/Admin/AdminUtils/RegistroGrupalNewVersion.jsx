import React, { useState } from 'react';
import axios from 'axios';
import getConfig from '../../../utils/getConfig';

const RegistroGrupalNewVersion = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Nuevo estado para la página actual

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleFileSelect = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const indices = (longitud) => {
    if (longitud < 1) return [];
  
    // Inicializando el array con el primer valor
    let numeros = [6];
  
    // Patrón observado para la secuencia
    //[2, 2, -3, 2, 2, -11, 2, 2, -3, 2, 2, 13, 2, 2, -3, 2, 2, -11, 2, 2,-3];
    const patron = [2, 2, -3, 2, 2, -11, 2, 2, -3, 2, 2, 13];
  
    for (let i = 1; i < longitud; i++) {
      // Usando el patrón para calcular el siguiente número
      // El patrón se repite, por lo que usamos el módulo para encontrar la posición correcta en el patrón
      numeros.push(numeros[i - 1] + patron[(i - 1) % patron.length]);
    }
    numeros.unshift(0)
console.log(numeros)
    return numeros;
  };
  
  const processCitizens = () => {
    const citizenBlocks = textValue.split(/(?=\d{11})/);
    const blockSize = citizenBlocks.length; // Tamaño del bloque (12 ciudadanos por página)
    const startIndex = currentPage * blockSize;
    const endIndex = startIndex + blockSize;

    const currentBlock = citizenBlocks.slice(startIndex, endIndex);
  
    // Verificar si currentBlock tiene menos de 12 elementos
    // if (currentBlock.length < blockSize) {
    //   console.error("Número insuficiente de ciudadanos en el bloque actual:", currentBlock.length);
    //   return; // Detener el procesamiento si no hay suficientes ciudadanos
    // }
  
    // Define el patrón de índices para la asignación de imágenes
    //                       [2, 2, -3, 2, 2, -11, 2, 2, -3, 2, 2, 13, 2, 2, -3, 2, 2, -11, 2, 2,-3];
    //patron predictivo [0,6, 8, 10, 7, 9, 11, 0, 2, 4, 1, 3, 5,18,20,22,19,21,23,12,14,16];
    const indexPattern = indices(blockSize+6)

    const processedCitizens = currentBlock.map((block, index) => {
      const cedulaMatch = block.match(/\d{11}/);
      const cedula = cedulaMatch ? cedulaMatch[0] : null;
      if (!cedula) return null; // Si no hay cédula, no procesamos este bloque
  
      const ageRegex = /(\d+)\s*AÑOS/i;
      const nameRegex = /AÑOS\n\n(.+?)\n\n/i;
      
      const ageMatch = block.match(ageRegex);
      const nameMatch = block.match(nameRegex);
  
      const edad = ageMatch ? ageMatch[1] : "Edad no encontrada";
      const nombre = nameMatch ? nameMatch[1].trim() : "Nombre no encontrado";
  
      // Calcula el índice de la imagen teniendo en cuenta la página actual y el patrón
      const imageIndex = (currentPage * blockSize) + indexPattern[index % blockSize];
      const image = selectedFiles.length > imageIndex ? selectedFiles[imageIndex] : null;
  
      //console.log(`Ciudadano ${index + startIndex}: Imagen asignada - ${image ? image.name : 'Ninguna'}, IndexPattern: ${imageIndex}`);
  
      return { cedula, nombre, edad, image };
    }).filter(citizen => citizen !== null);
  
    setProcessedData(processedCitizens);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedFiles([]); // Reinicia los archivos seleccionados para la próxima página
  };

  const handleSubmit = () => {
    const formData = new FormData();
    processedData.forEach((citizen, index) => {
      formData.append(`citizens[${index}]`, JSON.stringify(citizen));
      if (citizen.image) {
        formData.append('photos', citizen.image);
      }
    });

    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/citizens`, formData, getConfig())
      .then(response => {
        // Manejar respuesta exitosa
      })
      .catch(error => {
        // Manejar error
      });
  };

  return (
    <div>
      <h2>Registro Grupal Nueva Versión</h2>
      <textarea value={textValue} onChange={handleTextChange} rows="10" cols="50" placeholder="Pega aquí el texto del documento..."></textarea>
      <br/>
      <input type="file" multiple onChange={handleFileSelect} />
      <br/>
      <button onClick={processCitizens}>Procesar Página Actual</button>
      <button onClick={handleSubmit}>Enviar Datos</button>
      <button onClick={handleNextPage}>Siguiente Página</button>
      <div>
      {console.log(processedData.length)}
        {processedData.map((citizen, index) => (
          <div key={index}>
            <p>
              Ciudadano: {index}
              {citizen.image && <img src={URL.createObjectURL(citizen.image)} alt={`Ciudadano ${index}`} />} <br/>
              Cédula: {citizen.cedula} <br/>
              Nombre: {citizen.nombre} <
br/>
Edad: {citizen.edad}
</p>
<hr/>
</div>
))}
</div>
</div>
);
};

export default RegistroGrupalNewVersion;

//patron correcto
// <img src={selectedFiles[6] ? URL.createObjectURL(selectedFiles[6]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[8] ? URL.createObjectURL(selectedFiles[8]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[10] ? URL.createObjectURL(selectedFiles[10]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[7] ? URL.createObjectURL(selectedFiles[7]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[9] ? URL.createObjectURL(selectedFiles[9]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[11] ? URL.createObjectURL(selectedFiles[11]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[2] ? URL.createObjectURL(selectedFiles[2]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[4] ? URL.createObjectURL(selectedFiles[4]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[1] ? URL.createObjectURL(selectedFiles[1]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[3] ? URL.createObjectURL(selectedFiles[3]) : ''} alt="Imagen específica" /><br/>
//       <img src={selectedFiles[5] ? URL.createObjectURL(selectedFiles[5]) : ''} alt="Imagen específica" /><br/>