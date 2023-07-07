import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'
import getConfig from '../../../utils/getConfig'

const JobCard = ({empleo, getPeople}) => {

  const deleteJob = (itemId, ItemDescription) => {
    Swal.fire({
      title: `¿Seguro quieres eliminar ${ItemDescription}?`,
      text: `Esta Accion no se puede deshacer`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Dejar sin efecto",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo Eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Eliminando....',
          timer: 0,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
        })
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/intouch/job/${itemId}`
        axios.delete(URL, {
          headers:{
            Authorization: getConfig().headers.Authorization,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          Swal.fire(
            'Eliminado',
            'Accion realizada con éxito',
            'success'
          )
          getPeople()     
    })
    .catch(err =>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error!',
          
        })
    })
      }
    })
  
  }

  return (
    <div>
    <i className="fas fa-briefcase bg-primary" />
    <div className="timeline-item">
      <span className="time"><i className="far fa-clock" /> {empleo.startedAt}</span>
      <h3 className="timeline-header"><a href="#">{empleo.position}</a> en {empleo.institution}</h3>
      <div className="timeline-body">
      
      {empleo.positionDetails}
      </div>
      <p style={{margin:"10px"}}>
    <button className="btn btn-danger text-sm" onClick={()=> deleteJob(empleo.id, empleo.position)}><i className="fas fa-trash-alt"></i> Eliminar</button>
  </p>
      
    </div>
  </div>
  )
}

export default JobCard