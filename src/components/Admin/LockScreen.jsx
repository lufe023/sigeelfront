import React, { useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import SistemConfiguration from './SistemConfiguration'
import { Navigate } from 'react-router-dom'

const LockScreen = () => {
  const [user, setUser] = useState(useSelector(state=> state.userSlice))
  const [access, setAccess] = useState(false)
  const [passwordFail, setPasswordFail] = useState(0)
  const [msg, setMsg] = useState() 
  const {register, handleSubmit, reset} = useForm()
  const submit = data => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/login`
        axios.post(URL, {password:data.password, email: user?.email})
        .then(res =>
          {
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
            if(res.data.nivel>3){
              setAccess(true)
              setMsg('Cumple permisos')
              Toast.fire({
                icon: 'success',
                title: `Credenciales Correctas, permisos aceptados`
              })
              }
              else{
                setMsg('No cumple permisos')
                Toast.fire({
                  icon: 'success',
                  title: `Credenciales Correctas, pero no autorizado`
                })
              }
              
          
          }
        )
        .catch(err => {
          console.log(err)
          setPasswordFail(passwordFail+1)
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
            title: `Contraseña erronea, intentelo de  nuevo`
          })
        })
        reset({
        password:''
        })
    }

if(access){
return <SistemConfiguration/>
}
else if(passwordFail===2){

  return  <Navigate to='/logout' />

}else{
  return (
    <>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
    <section className="content">
<div className='hold-transition lockscreen'>
  <div className="" style={{height:"90vh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
<div>
  <div className="lockscreen-logo">
  <img src="img/logo-Mi-elector-Transparente-200x267.png" alt="AdminLTE Logo" className="brand-image" style={{width:"200px"}} />
  
  </div>
  {/* User name */}
  <div className="lockscreen-name">{msg? <span style={{color:"red"}}>{msg} </span>: user?.censu?.firstName}</div>
  {/* START LOCK SCREEN ITEM */}
  <div className="lockscreen-item">
    {/* lockscreen image */}
    <div className="lockscreen-image">
      <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${user?.censu?.picture}`} alt="User Image" />
    </div>
    {/* /.lockscreen-image */}
    {/* lockscreen credentials (contains the form) */}
    
    <form className="lockscreen-credentials"onSubmit={handleSubmit(submit) }>
      <div className="input-group">
        <input
        {...register('password')} 
        
        id="password" 
        required
        className="form-control"
        type="password" 
        placeholder="Contraseña" 
        autoComplete='new-password'/>
        <div className="input-group-append">
          <button type="button" className="btn">
            <i className="fas fa-arrow-right text-muted" />
          </button>
        </div>
      </div>
    </form>
    {/* /.lockscreen credentials */}
  </div>
  {/* /.lockscreen-item */}
  <div className="help-block text-center">
    
    Se nececita confirmar identidad para acceder a esta área
  </div>
  <div className="text-center">
    <Link to='/logout'>Iniciar con otro usuario</Link>
  </div>
  
  </div>
</div>
</div>
    </section>
    </div>
    <Footer/>
    </>
  )
}
}

export default LockScreen