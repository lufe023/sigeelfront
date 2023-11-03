import React, { useEffect, useState } from 'react'
import Cargando from '../../utils/Cargando'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
import Swal from 'sweetalert2'
//import "./NewCandidate.css"

const NewCandidate = ({getAllCandidates, getAllParties, parties}) => {
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

        let data = new FormData()
        
        data.append('name', e.target.nombre.value)
        data.append('party', e.target.partido.value)
        data.append('nomination', e.target.candidatura.value)
        data.append('file', e.target.file.files[0])
        data.append('distritoMunicipal', e.target.distrito.value)
        data.append('municipio', e.target.municipio.value)
        data.append('provincia', e.target.provincia.value)
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/`
        axios.post(URL,
        data,
        getConfig())
            .then(res => {
                setFormLoading(false)
                getAllCandidates()
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

    <form className='new-candidate-form' onSubmit={handleSubmit} encType='multipart/form-data'>
    <div className='row'>
    <div className="col-3">
        <input type="file" className="custom-file-input" id="canditate-picture" accept="image/png, image/jpeg" name="file" required/>
        <label className="custom-file-label" htmlFor="canditate-picture">Elige una foto</label>

    </div>

    <div className="col-2">
        <input required type="text" placeholder="Nombre" className="form-control" name='nombre' />
    </div>

    <div className="col-2">
        <select name='partido' className='form-control'>
            <option value={null}>Partido</option>
            {
                parties?.map((party)=>
                <option key={party.id} value={party.id} style={{backgroundColor:party.color}}>{party.partyAcronyms}</option>)
            }
        </select>
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
        <option key={provincia.id} value={provincia.id}>{provincia.name}</option>
        )
        }
        </select>
        </div>
        </div>
        <div className='row' style={{marginTop:"10px"}}>
        <div className="col-11">
        <select className="form-control" name='municipio' onChange={handleChangeDistrito}>
        <option value={null}>Municipio</option>
        {
        municipios?.map((municipio)=>
        <option key={municipio.id} value={municipio.id}>{municipio.name}</option>
        )
        }
        </select>
        </div>
        </div>
        <div className='row' style={{marginTop:"10px"}}>
        <div className="col-11">
        <select className="form-control" name='distrito' defaultValue={null}>
        <option value={'null'}>Distrito Municipal</option>
        {
        distritos?.map((distrito)=>
        <option key={distrito.id} value={distrito.id}>{distrito.name}</option>
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