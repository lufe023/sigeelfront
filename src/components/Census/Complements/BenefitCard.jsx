import React from 'react'
import Swal from 'sweetalert2'
import getConfig from '../../../utils/getConfig'
import axios from 'axios'

const BenefitCard = ({beneficio, getPeople}) => {

    const deleteBenefit = (itemId, ItemDescription) => {
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
            const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/intouch/benefit/${itemId}`
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
    <i className="fas fa-hand-holding-medical bg-success" />
    <div className="timeline-item">
      <span className="time"><i className="far fa-clock" /> {beneficio.receiveAt.substr(0,10)}</span>
      <h3 className="timeline-header"><a href="#">{beneficio.benefitDescription.substr(0,20)}</a></h3>
      <div className="timeline-body">
      {beneficio.benefitDescription}
      </div>
      <p style={{margin:"10px"}}>
    
      <button className="btn btn-danger text-sm" onClick={()=> deleteBenefit(beneficio.id, beneficio.benefitDescription)}><i className="fas fa-trash-alt"></i> Eliminar</button>
  </p>
      
    </div>
  </div>
  )
}

export default BenefitCard