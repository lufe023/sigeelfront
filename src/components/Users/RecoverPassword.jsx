import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Cargando from '../../utils/Cargando'
import getConfig from '../../utils/getConfig'

const RecoverPassword = () => {

  const [newPassword, setNewPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [areEquals, setAreEquals] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const {id} = useParams()

    const handleChangeNPassword= (e)=> {
      e.preventDefault()
        setNewPassword(e.target.value)
    }

    const handleChangeCPassword= (e)=> {
      e.preventDefault()
      setConfirmPassword(e.target.value)
  }

  useEffect(() => {

if(confirmPassword != false || newPassword !=false){
    if(newPassword != confirmPassword){
    setAreEquals(false)
    }else{
      setAreEquals(true)
    }
  }

}, [confirmPassword, newPassword])


const sendPassword = (e) => {

  e.preventDefault()

  setIsloading(true)

  const data = {
    newPassword: newPassword,
    confirmNewPassword: confirmPassword
}

const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/passwordRequest/${id}`
        axios.patch(URL,
        data, getConfig())
        .then(res =>
          {
            setIsloading(false)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 10000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Contraseña cambiada con exito! ve al inicio'
            })
          }
        )
        .catch(err => {
          console.log(err)
          setIsloading(false)
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
            title: 'No se pudo realizar la actualización'
          })
        })
      }   

const styles = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

if(isLoading){
  return(
  <div style={styles}>
    Cargando
    <button onClick={()=>setIsloading(false)} className="btn btn-primary">Volver</button>
    <Cargando escala={3}/>
    </div>
  )
}else
{
  return (
    <div className="login-page" style={styles}>

  <div className="login-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>SIGEEL</b></a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Estás a un paso de tu nueva contraseña, recupera tu contraseña ahora.</p>
      <form onSubmit={sendPassword}>
        <div className="input-group mb-3">
          <input type="password" name='nPassword' className="form-control" placeholder="Nueva contraseña" onChange={handleChangeNPassword} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" name='cPassword' className="form-control" placeholder="Confirma contraseña" onChange={handleChangeCPassword} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {
              areEquals?<button className="btn btn-primary btn-block">Cambiar Contraseña</button>
              :<p style={{color:'#dc3545', textAlign: 'Center'}}>Contraseñas no coinciden</p>
            }
            
          </div>
          {/* /.col */}
        </div>
      </form>
      <p className="mt-3 mb-1">
        <Link to="/">Login</Link>
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>

</div>
  )
    }
}

export default RecoverPassword