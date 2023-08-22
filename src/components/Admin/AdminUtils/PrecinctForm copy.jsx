import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import getConfig from '../../../utils/getConfig';

const PrecinctForm = ({getAllPrecints}) => {
  const [formData, setFormData] = useState({
    recintoNombre: '',
    DireccionRecinto: '',
    latitud: '',
    longitud: '',
    electLocal: 0,
    electExterior: 0,
    provincia: 0,
    municipio: 0,
    distrito: null,
    circunscripcion: '',
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
    // Aquí puedes enviar los datos al servidor o realizar cualquier otra acción necesaria
    console.log(formData)
    // axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`, formData, getConfig())
    //   .then((response) => {

    //     // Restablecer el formulario después de enviar los datos (opcional)
    //     setFormData({
    //       id: 0,
    //       precinct: '',
    //       electLocal: 0,
    //       electExterior: 0,
    //       meta: 0,
    //     });
    //     getAllPrecints()
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //       }
    //     })
        
    //     Toast.fire({
    //       icon: 'success',
    //       title: 'Colegio registrado'
    //     })
    //   })
    //   .catch((error) => {
    //     console.log( error);
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //       }
    //     })
    //     Toast.fire({
    //       icon: 'error',
    //       title: 'Algo anda mal'
    //     })
    //   })
  };


    /* llamar el mapa */
    const [maps, setMaps] = useState()
    const [preMunicipios, setPreMunicipios] = useState()
    const [preDistritos, setPreDistritos] = useState()

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
    const distritos = maps?.filter((map)=> map.parent == preDistritos )
    
    const handleChangeMunicipio = event => {
        setPreMunicipios(event.target.value);
        setPreDistritos(null)
        
    };

    const handleChangeDistrito = event => {
        setPreDistritos(event.target.value);
    };

  return (
    <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Registro de Recinto</h3>
      <div className="card-tools">
  <button type="button" className="btn btn-tool" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
</div>
    </div>
    {/* /.card-header */}
    <div className="card-body">
    <form onSubmit={handleSubmit}>
    <div className="row">
  <div className="col-md-6">
          
          <div className="form-group">
              <label>Numero</label>
              <input
                type="number"
                className="form-control"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Recinto Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="recintoNombre"
                value={formData.recintoNombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Direccion Recinto:</label>
              <input
                type="text"
                className="form-control"
                name="DireccionRecinto"
                value={formData.DireccionRecinto}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className='row'>
                <div className='col-md-6'>
                <label>latitud:</label>
                <input
                type="text"
                className="form-control"
                name="latitud"
                value={formData.latitud}
                onChange={handleChange}
              />
                </div>
                <div className='col-md-6'>
                <label>longitud:</label>
                <input
                type="text"
                className="form-control"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
              />
                </div>
              </div>
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
            <div className="form-group">
              <label>Circunscripcion:</label>
              <input
                type="text"
                className="form-control"
                name="circunscripcion"
                value={formData.circunscripcion}
                onChange={handleChange}
              />
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
              <label>Provincia:</label>
              <select className="form-control" name='provincia' onChange={ handleChangeMunicipio} size={6}>
        <option value='false'>Provincia</option>
        {
        provincias?.map((provincia)=>
        <option key={provincia.id} value={provincia.id} onClick={handleChange}>{provincia.name}</option>
        )
        }
        </select>
            </div>
            <div className="form-group">
              <label>Municipio:</label>
              <select className="form-control" name='municipio' onChange={handleChangeDistrito} size={6}>
        <option value={null}>Municipio</option>
        {
        municipios?.map((municipio)=>
        <option key={municipio.id} value={municipio.id}>{municipio.name}</option>
        )
        }
        </select>
            </div>
            <div className="form-group">
              <label>Distrito:</label>
              <select className="form-control" name='distrito' defaultValue={null} size={5}>
        <option value={'null'}>Ninguno</option>
        {
        distritos?.map((distrito)=>
        <option key={distrito.id} value={distrito.id}>{distrito.name}</option>
        )
        }
        </select>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div></div> </form>
    </div>
    </div>
  );
};

export default PrecinctForm;