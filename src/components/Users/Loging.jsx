import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { setUserData } from '../../store/slices/user.slice';
import Cargando from '../../utils/Cargando';

const Loging = () => {

  const dispatch = useDispatch()


  const [isLogged, setIsLogged] =useState(localStorage.getItem('token'))

  const user = useSelector(state=> state.userSlice)

  const [message, setMessage] = useState('')

  const [loader, setLoader] =useState()
  
  const {register, handleSubmit, reset} = useForm()
  

  const submit = data => {
const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/login`
    axios.post(URL, data)
    .then(res =>
      {
        dispatch(setUserData(res.data))
        localStorage.setItem('token',res.data.token)
        setIsLogged(true) 
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
      <p className="login-box-msg">Bienvenido</p>
      <p>
      <Link to='/logout' className="dropdown-footer btn-danger">Cerrar Sesion</Link>
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
      <p className="login-box-msg">Inicia sesion</p>
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
              loader?<Cargando escala={'0.3'}/>:''
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
        <Link to='/forgotPassword'>Olvidé la contraseña</Link>
      </p>
      <p className="mb-0">
        <Link to='preregister' className="text-center">Crear usuario</Link>
      </p>
    </div>
    {/* /.card-body */}
  </div>
  {/* /.card */}
</div>
  )
}

export default Loging