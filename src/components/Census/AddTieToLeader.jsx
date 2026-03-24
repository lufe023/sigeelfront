import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'
import '../../Styles/SearhPeople.css'
const AddTieToLeader = ({leaderCitizenId, bCitizenId}) => {

    const [tiesTypes, setTiesTypes] = useState()
//request Ties
const getTiesTypes = () => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/types`
    axios.get(URL,
    getConfig(),
    )
    .then(res => {
    setTiesTypes(res.data.data.rows)
})
.catch(err =>{
    console.log(err)
})
}
useEffect(() => {
    getTiesTypes()
}, [])

//add Tie to Leader
const addTies = (aCitizenId, bCitizenId, tiesType, description) => {
    //console.log(aCitizenId)
    // console.log(bCitizenId)
    // console.log(tiesType)

    Swal.fire({
        title: `¿Seguro quieres establecer un vinculo de ${description}?`,
        text: `Está acción hará que haya un vinculo entre este lider y esta persona`,
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Establecer!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Estableciendo',
            'Acción realizada con éxito',
            'success'
          )
          const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/${aCitizenId}/${bCitizenId}/${tiesType}`;
          axios
          .post(URL, '', getConfig())
          .then(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
    
            Toast.fire({
                icon: 'success',
                title: 'Vinculo Establecido'
            });
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
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
            Toast.fire({
                icon: 'error',
                title: `${err.response.data.msg}`
            });
            })
        }
    })
}

return (
    <div className="btn-group">
    <button 
      type="button" 
      className="btn btn-primary btn-sm dropdown-toggle" 
      data-toggle="dropdown" 
      aria-expanded="false"
    >
      Vínculo
    </button>
    <div 
      className="dropdown-menu dropdown-menu-right tu-elemento " 
      role="menu" 
     style={{
    zIndex: '9999', // Aumentamos el z-index para que flote sobre todo
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    padding: '8px 0', // Añade espacio arriba y abajo para que se vean los bordes
    right: 0,
    minWidth: '160px', // Evita que se vea colapsado
    border: '1px solid rgba(0,0,0,0.15)',
    maxHeight:'400px', // Asegura que el borde sea visible
    overflowY: 'scroll' // Permite scroll si hay muchas opciones
  }}
    >
      {tiesTypes?.map(type => (
        <button 
          key={type.id} 
          className="dropdown-item" 
          onClick={() => addTies(leaderCitizenId, bCitizenId, type.id, type.tiesDescription)}
        >
          {type.tiesDescription}
        </button>
      ))}
    </div>
  </div>
)
}

export default AddTieToLeader
