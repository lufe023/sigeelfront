import React, { useState } from 'react';
import axios from 'axios';
import getConfig from '../../../utils/getConfig';

const RegistroGrupalNewVersion = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const processCitizens = () => {
    const citizenBlocks = textValue.split(/(?=\d{11})/);
  
    const citizens = citizenBlocks.map((block, index) => {
      const cedulaMatch = block.match(/\d{11}/);
      const cedula = cedulaMatch ? cedulaMatch[0] : null;
  
      if (!cedula) {
        return null; // Si no hay cédula, no procesamos este bloque
      }
  
      // Buscamos la edad y el nombre utilizando expresiones regulares
      const ageRegex = /(\d+)\s*AÑOS/i;
      const nameRegex = /AÑOS\n\n(.+?)\n\n/i;
      
      const ageMatch = block.match(ageRegex);
      const nameMatch = block.match(nameRegex);
  
      const edad = ageMatch ? ageMatch[1] : "Edad no encontrada";
      const nombre = nameMatch ? nameMatch[1].trim() : "Nombre no encontrado";

      const citizen = { cedula, nombre, edad };

      if (selectedFiles[index]) {
        citizen.image = selectedFiles[index];
      }
  
      return citizen
    }).filter(citizen => citizen !== null); // Filtramos los nulos
  
    console.log(citizens);
    setProcessedData(citizens);
  };

  const handleSubmit = () => {
    // Lógica para enviar los datos al servidor
    const formData = new FormData();
    processedData.forEach((citizen, index) => {
      formData.append(`citizens[${index}]`, JSON.stringify(citizen));
      formData.append('photos', citizen.image);
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
      <button onClick={processCitizens}>Procesar Datos</button>
      <button onClick={handleSubmit}>Enviar Datos</button>
      <div>
        {processedData.map((citizen, index) => (
          <div key={index}>
            <p>Ciudadano: {citizen.cedula}</p>
            <p>Nombre: {citizen.nombre}</p>
            {citizen.image && <img src={URL.createObjectURL(citizen.image)} alt={`Ciudadano ${index}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistroGrupalNewVersion;