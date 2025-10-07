import React, { useState } from 'react'
import Cargando from '../../utils/Cargando'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import axios from 'axios'

const NewParty = ({getAllParties}) => {
  const [formLoading, setFormLoading] = useState(false)


  //funcion para enviar datos al servidor y guardar los datos
  const handleSubmit = e =>{
    e.preventDefault()
    setFormLoading(true)
    const data = {
      partyName: e.target.partyName.value,
      partyAcronyms: e.target.partyAcronyms.value,
      color: e.target.color.value,
    }
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/party`
        axios.post(URL,
        data,
        getConfig())
            .then(res => {
                setFormLoading(false)
                getAllParties()
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
                    title: 'Partido Agregado con exito'
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

if(formLoading){
  return <div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando scala="3"/></div>
}else {
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label>Nombre del Partido</label>
        <div className="input-group">
            <input type="text" className="form-control" name='partyName' />
        </div>
    </div>

    <div className="form-group">
        <label>Siglas</label>
        <div className="input-group">
            <input type="text"  className="form-control" name='partyAcronyms'/>
        </div>
    </div>

<div className="form-group">
  <label>Color Principal del Partido</label>
  <div className="input-group my-colorpicker2 colorpicker-element">
    <input type="color" className="form-control" name="color"/>
  </div>
  {/* /.input group */}
</div>
<div>
  <button className="btn btn-primary float-right" type='submit'>Guardar</button>
  </div>

</form>
    </>
  )
}
}

export default NewParty