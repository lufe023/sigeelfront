import React, { useState } from 'react'
import "./Modal.css"
const Modal = () => {
    const [showDiv, setShowDiv] = useState(true);

  const handleClick = () => {
    setShowDiv(!showDiv);
  };

  return (
    <>
    {showDiv && 
    <div className='area'>
    <div className='content'>
    <button onClick={handleClick}>Mostrar /Ocultar</button>
    Contenido del Div
    </div>
</div>
    }
    </>
  )
}

export default Modal