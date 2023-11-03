import React from 'react'
import "./CargandoB.css"
const CargandoB = ({scale}) => {
  return (
    <>
    <div className="lds-dual-ring" style={{scale:scale}}>
    </div>
    </>
  )
}

export default CargandoB