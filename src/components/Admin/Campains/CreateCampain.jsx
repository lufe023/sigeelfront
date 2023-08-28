import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../../utils/getConfig'
import Swal from 'sweetalert2'

const CreateCampain = ({getCampains}) => {

    const [maps, setMaps] = useState()
    const [preMunicipios, setPreMunicipios] = useState()
    const [preDistritos, setPreDistritos] = useState()
    const [formData, setFormData] = useState({
            name: '',
            details: '',
            municipio: null,
            provincia: null,
            startAt: '',
            finishAt: '',
            isActive: true
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const getAllMaps = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/maps`
            axios.get(URL, getConfig())
            .then(res => {
            setMaps(res.data.rows)
            })
            .catch(err =>{
            console.log(err)
            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
            
            Toast.fire({
                icon: 'error',
                title: `Accion no permitida: ${err.response.statusText}`
            })
            })
            
        }

        useEffect(() => {
        getAllMaps()
        }, [])

    /* fin de la llamada del mapa*/

    const provincias = maps?.filter((map)=> map.type == 'Provincia' )
    const municipios = maps?.filter((map)=> map.parent == preMunicipios )

    
    const handleChangeMunicipio = event => {
        setPreMunicipios(event.target.value);
        setPreDistritos(null)
        handleChange(event)
  
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes enviar los datos al servidor o realizar cualquier otra acción necesaria
  
      axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/campains`, formData, getConfig())
        .then((response) => {
          // Restablecer el formulario después de enviar los datos (opcional)
          setFormData({
            name: '',
            details: '',
            municipio: null,
            provincia: null,
            startAt: '',
            finishAt: '',
            isActive: true
          });

          getCampains()
          setPreDistritos(null)
          setPreMunicipios(null)
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
            title: 'Campaña Creada'
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
          console.log(error)
          Toast.fire({
            icon: 'error',
            title: 'Algo anda mal'
          })
        })
    };

 
  return (
<div className="col-md-12">
  <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Crear Campaña</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
          <i className="fas fa-minus" />
        </button>
      </div>
    </div>
    <div className="card-body">
    <div className="row">
    <div className="col-md-6">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Detalles</label>
              <textarea
                className="form-control"
                name="details"
                value={formData.details}
                style={{height:"71px"}}               
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Inicia</label>
              <input
                type="date"
                className="form-control"
                name="startAt"
                value={formData.startAt}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Finaliza</label>
              <input
                type="date"
                className="form-control"
                name="finishAt"
                value={formData.finishAt}
                onChange={handleChange}
              />
            </div>
          
    </div>
            <div className="col-md-6">
            <div className="form-group">
              <label>Activarla</label>
              <select
                type="text"
                className="form-control"
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                size={1}
              >
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Provincia:</label>
              <select className="form-control" name='provincia' onChange={ handleChangeMunicipio} size={4} defaultValue={formData.provincia}>
        {
        provincias?.map((provincia)=>
        <option key={provincia.id} value={provincia.id} >{provincia.name}</option>
        )
        }
        </select>
            </div>
            <div className="form-group">
              <label>Municipio:</label>
              <select className="form-control" name='municipio' size={4} defaultValue={formData.municipio} onChange={handleChange}>
        {
        municipios?.map((municipio)=>
        <option key={municipio.id} value={municipio.id}>{municipio.name}</option>
        )
        }
        </select>
            </div>
          </div>
    </div>
    </div>
   <div className='card-footer'>
   <button onClick={handleSubmit} className="btn btn-primary float-right">Crear</button>
   </div>
  </div>
  {/* /.card */}
</div>

  )
}

export default CreateCampain