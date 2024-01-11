import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import getConfig from '../../../utils/getConfig';

const CitizenForm = ({precints, getAllPrecints, getAllData}) => {
  

  const [mapa, setMapa] = useState([])

  const [formData, setFormData] = useState({
    precinct: '',
    college: ''
  });

  const [selectedPrecint, setSelectedPrecint] = useState()
  const selecciones = (recinto)=> {
    setSelectedPrecint(recinto?.colegios)
    setMapa(recinto)
  }

console.log(mapa)
  const selectHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [citizens, setCitizens] = useState([
    {
      citizenID: '',
      firstName: '',
      lastName: '',
      celphone: '',
      picture: null,
      province: mapa?.provincia,
      municipality: mapa?.municipio,
      district: mapa?.distrito,
      position: 0,
      college: selectedPrecint?.college,
      outside:null,
      adress: ''
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCitizens = [...citizens];
    updatedCitizens[index][name] = value;
    setCitizens(updatedCitizens);
  };

  const handlepictureChange = (e, index) => {
    const picture = e.target.files[0];
    const updatedCitizens = [...citizens];
    updatedCitizens[index].picture = picture;
    setCitizens(updatedCitizens);
  };

  const handleAddCitizen = () => {
    // Verificar que haya un recinto y colegio seleccionados antes de agregar un nuevo ciudadano
    if (!mapa?.provincia || !mapa?.municipio || !selectedPrecint?.college) {
      // Puedes mostrar un mensaje de error o manejarlo de la manera que prefieras
      console.error("Selecciona un recinto y colegio antes de agregar un ciudadano.");
      return;
    }
  
    // Agregar un nuevo ciudadano con los valores adecuados
    setCitizens([...citizens, {
      citizenID: '',
      firstName: '',
      lastName: '',
      celphone: '',
      picture: null,
      province: mapa.provincia,
      municipality: mapa.municipio,
      district: mapa.distrito,
      position: 0,
      college: selectedPrecint.college,
      outside: null,
      adress: ''
    }]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Crear un nuevo objeto FormData
    const formCitizens = new FormData();
  
    // Adjuntar datos de ciudadanos
    citizens.forEach((element, index) => {
      formCitizens.append(`citizens[${index}]`, JSON.stringify(element));
    });
  
    // Adjuntar imágenes de ciudadanos
    citizens.forEach((element, index) => {
      if (element.picture) {
        formCitizens.append(`pictures[${index}]`, element.picture);
      }
    });
  
    // Enviar datos al backend
    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/citizens`, formCitizens, getConfig())
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
          title: 'Ciudadano Registrado'
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
  

    // Reinicias el estado del formulario
    setCitizens([
      {
        citizenID: '',
      firstName: '',
      lastName: '',
      celphone: '',
      picture: null,
      province: mapa?.provincia,
      municipality: mapa?.municipio,
      district: mapa?.distrito,
      position: 0,
      college: selectedPrecint?.college,
      outside:null,
      adress: ''
      },
    ]);
  };

  return (
    <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Ingreso Manual de Ciudadanos</h3>
      <div className="card-tools">
  <button type="button" className="btn btn-tool" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
</div>
    </div>
    <div className="card-body">
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
                    <option onClick={()=> selecciones(recinto)} key={recinto?.id} value={recinto?.id}>{recinto?.precintNumber.toString().padStart(5, '0')} ({recinto?.PrecinctsMunicipio[0]?.name}) {recinto?.recintoNombre}</option>
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
    <div className="row">

      {citizens.map((citizen, index) => (
            <form key={index} encType="multipart/form-data" className='shadow-sm col-sm-4' style={{display:"flex", justifyContent:"space-between"}}>
             <div className="col-sm-2" style={{minHeight:"120px"}}>
    
               <div className="form-group">
               <div className="card-tools">
              <span title="3 New Messages" className="badge bg-success">{index + 1}</span>
              </div>
               {citizen.picture && (
              <img src={URL.createObjectURL(citizen.picture)} alt={`picture del ciudadano ${citizen.nombre}`} className="img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
            )}
               </div>
             </div>
             <div className="col-sm-8">
               {/* radio */}
            <div className="form-group">
      
          <label>
            <input type="text" className="form-control" placeholder="Cédula" name="citizenID" value={citizen.citizenID} onChange={(e) => handleInputChange(e, index)} />
          </label>
          
          <label>
            <input type="text" className="form-control" placeholder="Nombre" name="firstName" value={citizen.firstName} onChange={(e) => handleInputChange(e, index)} />
          </label>
          <br />
          <label>
            <input type="text" className="form-control" placeholder="Apellido" name="lastName" value={citizen.lastName} onChange={(e) => handleInputChange(e, index)} />
          </label>
          <br />
          <label>
            <input type="text" className="form-control" placeholder="Celular" name="celphone" value={citizen.celphone} onChange={(e) => handleInputChange(e, index)} />
          </label>
          <br />
          <div className="input-group">
          <div className="custom-file">
            <input type="file" name="picture" onChange={(e) => handlepictureChange(e, index)} className="btn btn-info" id="exampleInputFile" />
          </div>
          </div>
          <br />
          </div>
          </div>

          <input type="hidden" name="municipality" value={mapa?.municipio} />
          <input type="hidden" name="province" value={mapa?.provincia} />
          <input type="hidden" name="college" value={selectedPrecint?.college} />      
        </form>
      ))}
        </div>
       <br />
      <button type="button" onClick={handleAddCitizen}>
        Nuevo Formulario
      </button>
      <br />
      <button type="button" onClick={handleSubmit}>
        Enviar Datos
      </button>
    
    </div>
    </div>
  );
};

export default CitizenForm;
