import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ForgotPassword = () => {

    const [sent, setSent] = useState(false)
    const [message, setMessage] = useState()

    const handleSubmit = e =>{

    e.preventDefault()

    setSent(true)
        
    const data = {
        email: e.target.email.value,
    }

    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/passwordRequest/`
        axios.post(URL, data)
        .then(res =>
          {
            console.log(res)
            setMessage(`Peticion enviada, vaya a su correo ${e.target.email.value}, y haga click en el link que hemos enviado.`)
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
                title: 'Petición enviada'
            })
            
            }
        )
        .catch(err => {
            console.log(err)
            setMessage('No se pudo procesar la solicitud, asegurese de que este correo sea correcto')
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
            icon: 'error',
            title: 'Esta petición no pudo ser procesada'
            })
        })
    }

  return (
    <div className="login-page" style={{minHeight: 320}}>
   <div className="login-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>SIGEEL</b></a>
    </div>
    <div className="card-body">
    {
        sent?
        <p className="login-box-msg">
        {message}
        </p>
        :
        <p className="login-box-msg">
        ¿Perdiste tu contraseña? escribe tu correo electronico y de inmediato te envíaremos un link para que puedas recuperarla muy facíl, tambien puedes ponerte en contacto con tu lider para gestionarlo desde un centro de computo autorizado</p>
}
      <form onSubmit={handleSubmit}>
      
<div className="input-group mb-3">
<input type="text" className="form-control" disabled={sent?true:false} name='email' placeholder="Correo Electronico" />
<div className="input-group-append">
  <div className="input-group-text">
    <span className="fas fa-envelope" />
  </div>
</div>
</div>
<div className="row">
<div className="col-12">
    {
        sent?'':  <button type="submit" className="btn btn-primary btn-block">Enviar petición</button>
    }

</div>
{/* /.col */}
</div>

      </form>
      <p className="mt-3 mb-1">
        <Link to='/' >Login</Link> 
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>
  )
}

export default ForgotPassword