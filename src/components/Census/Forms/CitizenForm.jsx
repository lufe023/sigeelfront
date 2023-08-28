import React, { useState } from 'react';
import axios from 'axios';
import Cargando from '../../../utils/Cargando';
import getConfig from '../../../utils/getConfig';
import Swal from 'sweetalert2';

const CitizenForm = ({updates, citizen, getPeople}) => {
 
  const [formData, setFormData] = useState({
    nickname: citizen.nickname,
    adress: citizen.adress,
    celphone: citizen.celphone,
    telephone: citizen.telephone,
    otherPhone: citizen.otherPhone,
  })

  const [isLoading, setIsloading] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    setIsloading(true)
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar cualquier otra acción necesaria

    axios.patch(`${import.meta.env.VITE_API_SERVER}/api/v1/census/${citizen.citizenID}`, formData, getConfig())
      .then((response) => {
        // Restablecer el formulario después de enviar los datos (opcional)
        setFormData({
          nickname: '',
          adress: '',
          celphone: '',
          telephone: '',
          otherPhone: '',
        });
        getPeople()
        setIsloading(false)
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
          title: 'Buen trabajo, hay que actualizar siempre! '
        })
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
        setIsloading(false)
        Toast.fire({
          icon: 'error',
          title: 'Algo anda mal'
        })
      })
  };

  if(isLoading){
    return (
    <div className='loading' style={{height:"100px", marginBottom:"100px"}}>
      <Cargando escala='2'/>
    </div>
    )
  }else
  {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label htmlFor="apodo" className="col-sm-2 col-form-label">Apodo</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name='nickname'
            value={formData.nickname}
            onChange={ handleChange}
            placeholder="Apodo"
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="celular" className="col-sm-2 col-form-label">Celular</label>
        <div className="col-sm-10">
          <input
            type="tel"
            className="form-control"
            name="celphone"
            value={formData.celphone}
            onChange={handleChange}
            placeholder="Celular"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="telefonoResidencia" className="col-sm-2 col-form-label">Teléfono de Residencia</label>
        <div className="col-sm-10">
          <input
            type="tel"
            className="form-control"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Teléfono de Residencia"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="otroTelefono" className="col-sm-2 col-form-label">Otro Teléfono</label>
        <div className="col-sm-10">
          <input
            type={"tel"}
            className="form-control"
            name="otherPhone"
            value={formData.otherPhone}
            onChange={handleChange}
            placeholder="Otro Teléfono"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
            placeholder="Dirección"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" onClick={handleSubmit} className="btn btn-danger">Submit</button>
        </div>
      </div>
    </form>
  );
  }
};

export default CitizenForm;
