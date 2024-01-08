import React from 'react'
import { Link } from 'react-router-dom'

const RegisteredUser = () => {
  return (
    <div className="register-page">
    <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>Mi Elector</b></a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Registrado con exito</p>
    </div> 
    <Link to="/" className="text-center">Iniciar Session</Link> 
    </div>
    </div>
  )
}

export default RegisteredUser