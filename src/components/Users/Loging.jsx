import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Cargando from '../../utils/Cargando';




const Loging = () => {
  const [isLogged, setIsLogged] =useState(localStorage.getItem('token'))



  const [message, setMessage] = useState('')

  const [loader, setLoader] =useState()
  
  const {register, handleSubmit, reset} = useForm()
  


  const submit = data => {

const URL = 'http://localhost:9000/api/v1/auth/login'
    axios.post(URL, data)
    .then(res =>
      {

        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('firstName', res.data.User.first_name)
        localStorage.setItem('lastName', res.data.User.last_name)
        localStorage.setItem('picture', res.data.User.picture)

        setIsLogged(localStorage.getItem('token'))
        setLoader()
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
          title: 'Ingreso Exitoso'
        })
      
      }
    )
    .catch(err => {
      setMessage(err.response.data.message)
      setLoader()
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
        title: 'Algo anda mal'
      })
    })
  
    reset({
    password:''
    })
}

  const writenPassword = () =>{
    setMessage()
  }


  const load = ()=>{
    setLoader(true)
  }

if(isLogged)
{
  
  return(
<div className="login-box" style={{margin:'0 auto 40px auto'}}>
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="#" className="h1"><b>SIGEEL</b></a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Session Iniciada</p>
      <p>
      <Link to='/logout' className="dropdown-footer btn-danger">LogOut</Link>
      </p>
      </div> 
  </div>
      
</div>)

}else{
  
}
  return (
<div className="login-box" style={{margin:'0 auto 40px auto'}}>
  {/* /.login-logo */}
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>SIGEEL</b></a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Inicia session</p>
      <form  onSubmit={handleSubmit(submit) }>
        <div className="input-group mb-3">
        <input 
            {...register('email')}
            className='form-control' 
            type="email" 
            id="email" 
            placeholder="Pon tu email"
            required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
        <input 
        {...register('password')} 
              className='form-control' 
              type="password" 
              id="password" 
              placeholder="Pon tu contraseña"
              onInput={writenPassword}
              required
          />
          
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
          {
              loader?<Cargando/>:''
            }
          <div className="error ">
            
            
          
                  {
                  message?<div className="swalDefaultError">{message}</div>
                  :
                  ''
                  }
                  </div>
              <div id="toastsContainerTopRight" className="toasts-top-right fixed"></div>
            
          </div>
          {/* /.col */}
          <div className="col-4">
          
            <button type="submit" className="btn btn-primary btn-block" onClick={load}>Iniciar</button>
            <div id="toastsContainerTopRight" className="toasts-top-right fixed"></div>
          </div>
          {/* /.col */}
        </div>
      </form>
      <div className="social-auth-links text-center mt-2 mb-3">
      
      </div>
      {/* /.social-auth-links */}
      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p className="mb-0">
        <a href="register.html" className="text-center">Register a new membership</a>
      </p>
    </div>
    {/* /.card-body */}
  </div>
  {/* /.card */}
</div>
  )
}

export default Loging