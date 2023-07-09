import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getConfig from '../../../utils/getConfig'

const ShowTies = ({ties, setPeople}) => {
const estilo = {
  display:"flex",
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden'
}

const cursor = {
  cursor: "pointer"
}

const userDisable = (user, active) => {
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${user}`
      axios.patch(URL, {active:active}, getConfig())
      .then(res =>
        {
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
            title: 'Cambio Exitoso'
          })
        }
      )
      .catch(err => {
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
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: 'Accion no realizada'
        })
      })
  }

  return (
    <>
    {
        ties?.rows?.map(tie => 
    <div className="col-lg-3" key={tie.id} style={{display:"inline-block", minWidth:"250px"}}>
    <div className="small-box">
    <div className="inner" style={estilo}>
    <Link to={`/mypeople/${tie.aties.id}`} onClick={()=> setPeople()}>  
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${tie.aties.picture}`} alt="User Image" className="concurrencia-citizen-image" />
    </Link>
    {tie.tieType.tiesDescription}
    <Link to={`/mypeople/${tie.bties.id}`} onClick={()=> setPeople()}>  
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${tie.bties.picture}`} className="concurrencia-citizen-image" />
    </Link>
    </div>
    
    <a className="small-box-footer bg-gradient-danger" style={cursor}>
    <i className="fas fa-trash" /> Eliminar 
    </a>
    
    </div>
    </div>
    )}

    {/* <ul style={{padding:"7px"}}>
        {
        ties?.rows?.map(tie => 
        <li key={tie.id} style={{display:"inline-block", margin:'0 10px'}}>
        <div className="info-box" style={{maxWidth:"300px"}}>
        <Link to={`/mypeople/${tie.aties.id}`} onClick={()=> setPeople()} >
        <span className="info-box-icon">
        <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${tie.aties.picture}`} alt="User Image" className="concurrencia-citizen-image" />
        </span>
        </Link>
        <div className="info-box-content" >
          <span className="info-box-text"><Link to={`/mypeople/${tie.aties.id}`} onClick={()=> setPeople()} >{tie.aties.firstName}</Link></span>
          
            <small>{tie.tieType.tiesDescription} de</small>  <Link to={`/mypeople/${tie.bties.id}`}  onClick={()=> setPeople()}>{tie.bties.firstName}</Link>
      
            <span className="info-box-text"></span>
        </div>
        <Link to={`/mypeople/${tie.bties.id}`}  onClick={()=> setPeople()}>
        <span className="info-box-icon">
        <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${tie.bties.picture}`} alt="User Image" className="concurrencia-citizen-image" />
        </span>
        </Link>
        </div>
        </li>

            )
        }


    </ul> */}
    </>
  )
}

export default ShowTies