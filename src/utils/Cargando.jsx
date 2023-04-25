import React from 'react'
import './Loader.css'
const Cargando = ({escala}) => {
  return (
    <div className="lds-roller" style={{scale:escala, display:"flex", justifyContent:"center", alignItems:"center"}}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>Cargando</div>
  )
}

export default Cargando