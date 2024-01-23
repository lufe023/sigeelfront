import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import getConfig from '../../../utils/getConfig';

const DataProcessorB = ({precints, getAllPrecints, getAllData}) => {
  const [textValue, setTextValue] = useState('');
  const [selectedPrecint, setSelectedPrecint] = useState()
  const [mapa, setMapa] = useState([])
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotoSelect = (event) => {
    const selectedFiles = event.target.files;
    const photoArray = Array.from(selectedFiles);
  
    // Ordenar las fotos por fecha (puedes ajustar la lógica de comparación según el nombre de archivo o metadatos de fecha)
    photoArray.sort((b, a) =>  b.lastModified - a.lastModified );
  
    // Dividir las fotos en lotes de 22
    const groupedPhotos = [];
    for (let i = 0; i < photoArray.length; i += 16) {
      groupedPhotos.push(photoArray.slice(i, i + 16));
    }
  
    // Invertir el orden de cada lote de 22 fotos
    const updatedSelectedPhotos = groupedPhotos.map((group) => group.reverse());
  
    // Combinar los lotes nuevamente en un solo array
    const flattenedList = [].concat(...updatedSelectedPhotos);
  
    setSelectedPhotos(flattenedList);
  };

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


    
    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/newcitizenB`, formData, getConfig())
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
      <h3 className="card-title">Ingreso Grupal de Ciudadanos B</h3>
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
                    {console.log(precints)}  
                  {//PrecinctsDistrito
                    precints?.map(recinto => 
                    <option onClick={()=> selecciones(recinto)} key={recinto?.id} value={recinto?.id}> 
                    <small className="badge badge-info">
                    {recinto?.precintNumber.toString().padStart(5, '0')} </small>
                    {recinto?.PrecinctsDistrito[0]?.name?`${recinto?.PrecinctsMunicipio[0]?.name}, ${recinto?.PrecinctsDistrito[0]?.name} `: `${recinto?.PrecinctsMunicipio[0]?.name} `}
                    {recinto?.recintoNombre}</option>
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
        const posicion = index + 1;
       // Expresión regular para extraer nombre y apellido
  const nombreApellidoRegex = /([A-ZÁÉÍÓÚÑ\s]+), ([A-ZÁÉÍÓÚÑ\s]+)/;
  const nombreApellidoMatch = info.match(nombreApellidoRegex);
  let apellido = '';
  let nombre = '';
  if (nombreApellidoMatch) {
    apellido = nombreApellidoMatch[1].trim();
    nombre = nombreApellidoMatch[2].trim();
  }


        let apellidoN = apellido.replace('@', '').replace('*', '').trim();
        
        let colegioN = formData.college
        let uuid = crypto.randomUUID()
        const foto = selectedPhotos[index];
        const nombreFoto = foto ? foto.name: '';

        citizens.push({
          id: uuid,
          citizenID: cedula,
          position: Number(posicion),
          firstName: nombre,
          lastName: apellidoN,
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

export default DataProcessorB;
