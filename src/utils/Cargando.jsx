import React from 'react'
import './Loader.css'
const Cargando = ({escala}) => {
  return (
    <div className="lds-roller" style={{scale:escala}}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}

export default Cargando