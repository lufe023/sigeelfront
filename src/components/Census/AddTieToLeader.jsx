import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'

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
    <div className="btn-group float-right">
    <button type="button" className="btn btn-primary" data-toggle="dropdown" aria-expanded="false">Vinculo</button>
    <button type="button" className="btn btn-primary dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
    </button>
    <div className="dropdown-menu" role="menu">
    {
      tiesTypes?.map(type => 
        <button key={type.id} className="dropdown-item" onClick={()=> addTies(leaderCitizenId, bCitizenId, type.id, type.tiesDescription)}>{type.tiesDescription}</button>
      )
    }
      
    </div>
  </div>
)
}

export default AddTieToLeader