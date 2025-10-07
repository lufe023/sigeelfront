import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../../utils/getConfig'
import Swal from 'sweetalert2'

const SelectPlace = ({setCampains, formMapData, setFormMapData}) => {

    const [maps, setMaps] = useState()
    const [preMunicipios, setPreMunicipios] = useState()
    const [preDistritos, setPreDistritos] = useState()


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormMapData((prevData) => ({
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
    const getCampains = (place,col)=>{

      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/campains/byplace?place=${place}&col=${col}`
          axios.get(URL,
          getConfig()
          )
          .then(res => {
            setCampains(res.data.rows)
      })
      .catch(err =>{
          setIsloading(false)
          console.log(err)
      })
      }

  return (

    <div className="row">

    <div className='col-4'>
        <div className="form-group">
            <label>Provincia:</label>
            <select className="form-control" name='provincia' onChange={ handleChangeMunicipio} size={4} defaultValue={formMapData.provincia}>
    {
    provincias?.map((provincia)=>
    <option key={provincia.id} value={provincia.id} >{provincia.name}</option>
    )
    }
    </select>
        </div>
    </div>
    <div className='col-4'>
        <div className="form-group">
            <label>Municipio:</label>
            <select className="form-control" name='municipio' size={4} defaultValue={formMapData.municipio} onChange={handleChange}>
    {
    municipios?.map((municipio)=>
    <option key={municipio.id} value={municipio.id}>{municipio.name}</option>
    )
    }
    </select>
      </div>
    </div>
    {
      formMapData.municipio?
 
    <div className='col-12'>
      <button className='btn btn-success' onClick={()=> getCampains(formMapData.municipio,'municipio')}>Filtrar Campañas</button>
    </div>
    :""
    }
    </div>
  )
}

export default SelectPlace