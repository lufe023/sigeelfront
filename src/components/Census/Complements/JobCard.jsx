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
      <h3><a>{empleo.position}</a> en {empleo.institution}</h3>
      <p>{empleo.positionDetails}</p>
      <div className="row">
  <div className="col-md-3" style={{minWidth:"200px"}}>
    <div className="info-box">
      <span className="info-box-icon bg-info"><i className="fas fa-calendar-alt"></i></span>
      <div className="info-box-content">
        <span className="info-box-text">Inició</span>
        <span className="info-box-number">{empleo.startedAt.substring(0,10)}</span>
      </div>
      {/* /.info-box-content */}
    </div>
    {/* /.info-box */}
  </div>
  <div className="col-md-3" style={{minWidth:"200px"}}>
    <div className="info-box">
      <span className="info-box-icon bg-info"><i className="fas fa-calendar-alt"></i></span>
      <div className="info-box-content">
        <span className="info-box-text">Finalizó</span>
        <span className="info-box-number">{empleo.finishAt.substring(0,10)}</span>
      </div>
      {/* /.info-box-content */}
    </div>
</div>
      </div>
      <p style={{margin:"10px"}}>
      <button className="btn btn-danger text-sm" onClick={()=> deleteJob(empleo.id, empleo.position)}><i className="fas fa-trash-alt"></i> Eliminar</button>
  </p>

  <hr />
  </div>
  )
}

export default JobCard