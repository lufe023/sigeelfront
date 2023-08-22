import React, { useState } from 'react';
import axios from 'axios';
import getConfig from '../../../utils/getConfig';
import Swal from 'sweetalert2';

const CollegeForm = ({precints, getAllPrecints}) => {
  const [selectedPrecint, setSelectedPrecint] = useState()

  const [formData, setFormData] = useState({
    id: 0,
    precinct: '',
    electLocal: 0,
    electExterior: 0,
    meta: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cambia 'url_del_endpoint' por la URL real del endpoint que procesará los datos en el servidor
    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/colleges`, formData, getConfig())
      .then((response) => {
        // Restablecer el formulario después de enviar los datos (opcional)
        setFormData({
          id: 0,
          precinct: '',
          electLocal: 0,
          electExterior: 0,
          meta: 0,
        });
        getAllPrecints()
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
      })
      .catch((error) => {
        console.error('Error al enviar los datos:', error);
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
      });
  };

  return (
    <div className="card card-success">
      <div className="card-header">
        <h3 className="card-title">Registro de Colegio o Mesa Electoral</h3>
        <div className="card-tools">
  <button type="button" className="btn btn-tool" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
</div>

      </div>
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Numero:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    min={1}
                    max={500}
                  />
                </div>
                <div className="form-group">
                  <label>Meta</label>
                  <input
                    type="number"
                    className="form-control"
                    name="meta"
                    value={formData.meta}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Electorado Local</label>
                  <input
                    type="number"
                    className="form-control"
                    name="electLocal"
                    value={formData.electLocal}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Electorado Exterior</label>
                  <input
                    type="number"
                    className="form-control"
                    name="electExterior"
                    value={formData.electExterior}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
            <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label>Recinto</label>
                  <select
                    className="form-control"
                    name="precinct"
                    value={formData.precinct}
                    onChange={handleChange}
                    required
                    size={5}>
                    
                  {
                    precints?.map((recinto) => 
                    <option onClick={()=>setSelectedPrecint(recinto?.colegios)} key={recinto?.id} value={recinto?.id}>{recinto?.id.toString().padStart(5, '0')} {recinto?.recintoNombre}</option>
                    )
                  }
                  </select>
                </div>
                
              </form>
              <div className="form-group">
                  <label>Colegios en este recinto</label>
                  <select
                    className="form-control"
                    name="college"
                    onChange={handleChange}
                    required
                    size={5}>
                      
                      {
                      selectedPrecint?.map((colegio) => 
                          <option key={colegio?.id} value={colegio?.id}>Colegio {colegio?.id.toString().padStart(4, '0')}</option>
                          )
                      }
                  </select>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeForm;
