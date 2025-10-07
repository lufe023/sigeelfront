import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import getConfig from '../../../utils/getConfig';

const NewCitizenForm = ({precints, getAllPrecints, getAllData}) => {

  const [mapa, setMapa] = useState([])

  const [selectedPrecint, setSelectedPrecint] = useState()


  const [formData, setFormData] = useState({
    precinct: '',
    college: ''
  });

  const [citizen, setCitizen] = useState({
    firstName: '',
    lastName: '',
    citizenID: '',
    province: null,
    municipality: null,
    district: null,
    position: 900,
    address: '',
    outside: false,
    telephone: '',
    celphone: '',
    college: null,
  });


  const selectHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [photo, setPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Actualizar todas las propiedades en una sola llamada
    setCitizen((prevCitizen) => ({
      ...prevCitizen,
      [name]: value,
      municipality: mapa?.municipio,
      province: mapa?.provincia,
      district: mapa?.distrito
      // Agrega otras propiedades según sea necesario
    }));
  };
  
  const selecciones = (recinto)=> {
    setSelectedPrecint(recinto?.colegios)
    setMapa(recinto)
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('citizen', JSON.stringify(citizen)); // Envía el objeto directamente
    
    formData.append('photos', photo);

      // Enviar datos al backend
      axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/newcitizen`, formData, getConfig())
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
    }
  return (
    <>
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

    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className='row'> 
    <div className="col-md-6">

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
                
          
</div>
<div className="col-md-6">
              <div className="form-group">
                  <label>Colegios en este recinto</label>
                  <select
                    className="form-control"
                    name="college"
                    required
                    onChange={handleInputChange}
                    size={5}>
                      {
                      selectedPrecint?.sort((a, b) => a.collegeNumber - b.collegeNumber).map((colegio) => 
                      <option key={colegio?.id} value={colegio?.id}>Colegio {colegio?.collegeNumber.toString().padStart(4, '0')}</option>)
                      }
                  </select>
                </div>
            </div>
          </div>
          <div className="form-group">
  {photo && (
    <img src={URL.createObjectURL(photo)} alt={`foto del ciudadano`} className="img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
  )}
</div>
          <div className="form-group">
      <label>
        <input type="number" className="form-control" placeholder="Cédula" name="citizenID" value={citizen.citizenID} onChange={handleInputChange} required />
      </label>
      <br />
      <label>

        <input type="text" className="form-control" placeholder="Nombre" name="firstName" value={citizen.firstName} onChange={handleInputChange} required />
      </label>
      <br />
      <label>

        <input type="text" className="form-control" placeholder="Apellido" name="lastName" value={citizen.lastName} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <input type="text" className="form-control" placeholder="Dirección" name="address" value={citizen.address} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        <input type="text" className="form-control" placeholder="Teléfono" name="telephone" value={citizen.telephone} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        <input type="text" className="form-control" placeholder="Celular" name="celphone" value={citizen.celphone} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Foto:
        <input type="file" name="photos" onChange={handlePhotoChange} accept="image/*" required />
      </label>
      <br />
      
</div>
      <button type="submit" className='btn btn-primary'>Guardar</button>
    </form>
</div>
</div>
    </>
  );
};

export default NewCitizenForm;
