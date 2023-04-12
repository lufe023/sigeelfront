import React, { useEffect, useState } from 'react'
import Cargando from '../../utils/Cargando'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
import Swal from 'sweetalert2'
//import "./NewCandidate.css"

const NewCandidate = ({getAllUsers}) => {
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
    const [formLoading, setFormLoading] = useState(false)
    const handleSubmit = e =>{
        e.preventDefault()
        setFormLoading(true)

        const data = {
            name : e.target.nombre.value,
            party : e.target.partido.value,
            partyAcronym : e.target.acronimo.value,
            nomination : e.target.candidatura.value,
            picture: '',
            distritoMunicipal : e.target.distrito.value,
            municipio : e.target.municipio.value,
            provincia : e.target.provincia.value
        }
        
        
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/`
        axios.post(URL,
        data,
        getConfig())
            .then(res => {
                setUsers(res.data.results)
                setFormLoading(false)
                getAllUsers()
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
                    title: 'Candidato Agregado con exito'
                })
            })
            .catch(err =>{
                console.log(err)
                setFormLoading(false)
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
                title: `Accion no permitida: ${err.response.data.message}`
                })
            }) 
    }

    const provincias = maps?.filter((map)=> map.type == 'Provincia' )
    const municipios = maps?.filter((map)=> map.parent == preMunicipios )
    const distritos = maps?.filter((map)=> map.parent == preDistritos )

  

    const handleChangeMunicipio = event => {
        setPreMunicipios(event.target.value);
    };

    const handleChangeDistrito = event => {
        setPreDistritos(event.target.value);
    };

if(formLoading){
    return <div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando scala="3"/></div>
}else{
  return (
    <div className='card-body'>
    <h3>Agregar un nuevo candidato/a</h3>

    <form className='new-candidate-form' onSubmit={handleSubmit}>
    <div className='row'>
    <div className="col-3">
        <input type="file" className="custom-file-input" id="canditate-picture" accept="image/png, image/jpeg"/>
        <label className="custom-file-label" htmlFor="canditate-picture">Elige una foto</label>

    </div>

    <div className="col-2">
        <input required type="text" placeholder="Nombre" className="form-control" name='nombre' />
    </div>

    <div className="col-2">
        <input required type="text" placeholder="Partido" className="form-control" name='partido' />
    </div>
    <div className="col-2">
        <input required type="text" placeholder="Acronimo" className="form-control" name='acronimo'/>
    </div>
    <div className="col-2">
    
    <select className="form-control" name='candidatura'>
        <option>Postula a</option>
        <option>Consejal Distrital</option>
        <option>Director Municipal</option>
        <option>Regidor Municipal</option>
        <option>Alcalde Municipal</option>
        <option>Diputado/a</option>
        <option>Senador/a</option>
        <option>Presidente</option>
        </select>
        </div>
        </div>
        <div className='row' style={{marginTop:"10px"}}>
        <div className="col-11">
        <select className="form-control" name='provincia' onChange={handleChangeMunicipio}>
        <option value='false'>Provincia</option>
        {
        provincias?.map((provincia)=>
        <option value={provincia.id}>{provincia.name}</option>
        )
        }
        </select>
        </div>
        </div>
        <div className='row' style={{marginTop:"10px"}}>
        <div className="col-11">
        <select className="form-control" name='municipio' onChange={handleChangeDistrito}>
        <option value={null}>Municipio</option>
        <hr/>
        {
        municipios?.map((municipio)=>
        <option value={municipio.id}>{municipio.name}</option>
        )
        }
        </select>
        </div>
        </div>
        <div className='row' style={{marginTop:"10px"}}>
        <div className="col-11">
        <select className="form-control" name='distrito'>
        <option value={413}>Distrito Municipal</option>
        <hr/>
        {
        distritos?.map((distrito)=>
        <option value={distrito.id}>{distrito.name}</option>
        )
        }
        </select>
        </div>
        </div>
        
<div className="card-footer">
<button className="btn btn-primary float-right">Guardar</button>
</div>
</form>
    </div>
)
}
}

export default NewCandidate