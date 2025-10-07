import React from 'react'
import './Loader.css'
const Cargando = ({escala}) => {
  return (
    <>
    
     
    <div className="lds-roller" style={{scale:escala}}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <img src="img/MIELECTOR-Isotipo.png"
    alt="Mi Elector Logo"
    className="brand-image img-circle "
    style={{scale:escala, width:"45px", position:"relative", top:"50px", left:"10px"}} />
</>
  )
}

export default Cargando