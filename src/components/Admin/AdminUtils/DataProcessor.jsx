import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import getConfig from '../../../utils/getConfig';

const DataProcessor = ({precints, getAllPrecints, getAllData}) => {
  const [textValue, setTextValue] = useState('');
  const [selectedPrecint, setSelectedPrecint] = useState()
  const [mapa, setMapa] = useState([])
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotoSelect = (event) => {
    const selectedFiles = event.target.files;
    const photoArray = Array.from(selectedFiles);
  
    // Ordenar las fotos por fecha (puedes ajustar la lógica de comparación según el nombre de archivo o metadatos de fecha)
    photoArray.sort((a, b) => a.lastModified - b.lastModified);
  
    // Dividir las fotos en lotes de 22
    const groupedPhotos = [];
    for (let i = 0; i < photoArray.length; i += 22) {
      groupedPhotos.push(photoArray.slice(i, i + 22));
    }
  
    // Invertir el orden de cada lote de 22 fotos
    const updatedSelectedPhotos = groupedPhotos.map((group) => group.reverse());
  
    // Combinar los lotes nuevamente en un solo array
    const flattenedList = [].concat(...updatedSelectedPhotos);
  
    setSelectedPhotos(flattenedList);
  };

let totalExterior = 0
  const citizens = []
  const [formData, setFormData] = useState({
    precinct: '',
    college: ''
  });
  const processCitizen = (citizens) => {

    const formData = new FormData();
    
    //formData.append("citizens", JSON.stringify(citizens))
    citizens.forEach((element, index) => {
      formData.append(`citizens[${index}]`, JSON.stringify(element));
    });


    selectedPhotos.forEach((photo, index) => {
      formData.append('photos', photo);
    });

    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/citizens`, formData, getConfig())
      .then((response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Colegio registrado'
        })
        getAllData()
        getAllPrecints()
      })
      .catch((error) => {
        console.log( error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Algo anda mal'
        })
      })
  }

  const selecciones = (recinto)=> {
    setSelectedPrecint(recinto?.colegios)
    setMapa(recinto)
  }
  const handleChange = (event) => {
    event.preventDefault();
    setTextValue(event.target.textarea.value);
  };

  const selectHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const regex = /\b\d{3}-\d{7}-\d\b/g;
  const matches = textValue.match(regex) || [];
  const sections = textValue.split(regex);

  return (
    <div className="card card-info">
    <div className="card-header">
      <h3 className="card-title">Ingreso Grupal de Ciudadanos</h3>
      <div className="card-tools">
  <button type="button" className="btn btn-tool" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
</div>
    </div>
    <div className="card-body" style={{maxHeight:'700px', overflow:"auto"}}>
<div className='row'> 
<div className="col-md-6">
              <form encType="multipart/form-data">
                <div className="form-group">
                  <label>Recinto</label>
                  <select
                    className="form-control"
                    name="precinct"
                    value={formData.precinct}
                    onChange={selectHandleChange}
                    required
                    size={5}>
                  {
                    precints?.map(recinto => 
                    <option onClick={()=> selecciones(recinto)} key={recinto?.id} value={recinto?.id}>{recinto?.precintNumber.toString().padStart(5, '0')} {recinto?.recintoNombre}</option>
                    )
                  }
                  </select>
                </div>
                
              </form>
</div>
<div className="col-md-6">
              <div className="form-group">
                  <label>Colegios en este recinto</label>
                  <select
                    className="form-control"
                    name="college"
                    required
                    onChange={selectHandleChange}
                    size={5}>
                      {
                      selectedPrecint?.sort((a, b) => a.collegeNumber - b.collegeNumber).map((colegio) => 
                      <option key={colegio?.id} value={colegio?.id}>Colegio {colegio?.collegeNumber.toString().padStart(4, '0')}</option>)
                      }
                  </select>
                </div>
            </div>
          </div>
    <div className="container mt-4">
      <h5>Pegar Datos:</h5>
      <form onSubmit={handleChange}>
      <div className="row">
      <div className="input-group">
        <textarea
          className="form-control"
          rows="6"
          cols="40"
          placeholder="Ingresa tu texto aquí..."
          name="textarea"
        />
        </div>
        </div>
         <div className="row">
          
          {/* Agrega el input de tipo 'file' para seleccionar las fotos */}
  <div className="input-group">
  <div className="custom-file">
    
    <input className='custom-file-input' type="file" name="photos" multiple onChange={handlePhotoSelect} />
    <label className="custom-file-label" htmlFor="exampleInputFile">{selectedPhotos.length} Fotos Seleccionadas</label>
  </div>
  <div className="input-group-append">
  <button type="submit" className="input-group-text btn btn-warning">Procesar</button>
  </div>
</div>

         
          {/* Muestra la vista previa de las fotos seleccionadas */}
   
        </div>
       

      </form>
      <div className='row'>
        <div className='mt-4 col-md-12'>
      <div className="form-group">
      <button className='btn btn-success btn-lg' onClick={()=>processCitizen(citizens)}>Subir</button>

      </div>
      </div>
      </div>

      <h5 className="mt-4">Cedulas encontradas: {matches.length}</h5>
      {matches.map((match, index) => {
        const info = sections[index + 1];
        const cedula = match.replace("-","").replace('-','');
        const posicion = info.substring(1, 15).trim();
        const apellidoRegex = /(?:[*@FPD]\s)(.*?),/;
        const apellidoMatch = info.match(apellidoRegex);
        let apellido = '';
        let direccion = info.substring(
          info.indexOf('Dir:') + 4,
          info.indexOf('el:') - 1
        );

        if (apellidoMatch) {
          apellido = apellidoMatch[1].trim();
        }

        const nombreStartIndex = info.indexOf(',') + 1;
        const nombre = info.substring(nombreStartIndex, info.indexOf('Dir:')).trim();

        const Tel = info.substring(info.indexOf('Tel:') + 4, info.indexOf('Tel:') + 20).trim();
        const Cel = info.substring(info.indexOf('Cel:') + 4, info.indexOf('Cel:') + 20).trim();

        // Validar la longitud de Tel y Cel
        const formattedTel = Tel.length >= 10 ? Tel : '';
        const formattedCel = Cel.length >= 10 ? Cel : '';

        if (info.substring(0, 100).includes('EXT')) {
          totalExterior +=1
          
        }

        let apellidoN = apellido.replace('@', '').replace('*', '').trim();
        let exteriorN = info.substring(0, 100).includes('EXT') ? true : false;
        let colegioN = formData.college
        let direccionN = direccion.trim()
        let formattedTelN = formattedTel.replace('(','').replace(')','').replace(' ','').replace('-','')
        let formattedCelN = formattedCel.replace('(','').replace(')','').replace(' ','').replace('-','')
        let uuid = crypto.randomUUID()
        const foto = selectedPhotos[index];
        const nombreFoto = foto ? foto.name: '';

        citizens.push({
          id: uuid,
          citizenID: cedula,
          position: Number(posicion),
          firstName: nombre,
          lastName: apellidoN,
          adress: direccionN,
          outside: exteriorN,
          telephone: formattedTelN,
          celphone: formattedCelN,
          college: colegioN,
          picture:nombreFoto,
          province: mapa?.provincia,
          municipality: mapa?.municipio,
          district: mapa?.distrito
        });
  
        return (
          <div key={index} className="card mt-4">
            <div className="card-body">
              <ul>
                <li>id: {uuid}</li>
                <li>citizenID: {cedula}</li>
                <li>position: {posicion}</li>
                <li>firstName: {nombre}</li>
                <li>lastName: {apellidoN}</li>
                <li>adress: {direccionN}</li>
                <li>outside: {exteriorN}</li>
                <li>telephone: {formattedTelN}</li>
                <li>celphone: {formattedCelN}</li>
                <li>college: {colegioN}</li>
                <li>province: {mapa?.provincia}</li>
                <li>municipality: {mapa?.municipio}</li>
                <li>district:{mapa?.distrito}</li>
                {selectedPhotos[index] && (
              <li>
                <strong>Foto:</strong>
                <img src={URL.createObjectURL(selectedPhotos[index])} alt={`Foto del ciudadano ${nombre}`} className="img-thumbnail" />
              </li>
            )}
              </ul>
              <hr />

              <strong>Extracto:</strong> {info}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  </div>
  );
  
};

export default DataProcessor;
