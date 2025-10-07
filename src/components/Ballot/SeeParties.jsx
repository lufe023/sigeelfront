import axios from 'axios'
import React from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'

const SeeParties = ({getAllParties, parties}) => {

    const deleteParty = (id) => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/party/${id}`
        axios.delete(URL,
        getConfig())
            .then(res => {
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
                    title: 'Partido Eliminado con exito'
                })
            })
            .catch(err =>{
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
                title: `Hubo un error no se borro el partido`
                })
            })
  

    }
  return (
    <>
   <div className="col-12">
  <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Partidos</h3>
    </div>
    {/* /.card-header */}
    <div className="card-body">
      <div className="row">
        {
            parties?.map((party) => 
            <div className="col-sm-4" key={party.id} style={{marginBottom:"10px"}}>
            <div className="position-relative p-3 bg-gray" style={{height: 180}}>
              <div className="ribbon-wrapper ribbon-xl">
                <div className="ribbon text-xl" style={{background:party.color, color:"#000"}}>
                {party.partyAcronyms}
                </div>
              </div>
              {party.partyAcronyms} <br />
              <small>{party.partyName}</small>
            
            </div> 
            <div style={{backgroundColor:party.color, padding:"5px", borderColor:"gray", borderBottom:"solid 5px"}}>
            <button className='btn btn-primary' onClick={() => deleteParty(party.id)}>Eliminar</button>
            </div>
          </div>
            )
        }
      
      </div>

    </div>
    {/* /.card-body */}
  </div>
  {/* /.card */}
</div>

    </>
  )
}

export default SeeParties