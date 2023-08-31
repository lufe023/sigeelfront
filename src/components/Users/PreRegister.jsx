import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Cargando from '../../utils/Cargando'
import getConfig from '../../utils/getConfig'
import RegisteredUser from '../Did/RegisteredUser'
import "./PreRegister.css"

const PreRegister = () => {

  const [people, setPeople] = useState()
  const [inputsLoader, setInputsLoader] = useState(false)
  const [formLoader, setFormLoader] = useState(false)
  const [showError, setShowError] = useState('')
  const [res, setRes] = useState(false)
  const [message, setMessage] = useState()

const findingWord = e => {

    let fn = e.target.value.trim().replaceAll("-", "")

    if(fn!='' && fn.length==11){
    setInputsLoader(true)
    findPeople(fn)
  }else{
    setPeople({firstName:'', lastName:''})
  }
}


  const findPeople = (findWord)=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/simplesearch`
        axios.post(URL,
            {
                findWord:findWord  
            },
        getConfig(),
        )
        .then(res => {
          //console.log(res)
          if(!res.data.data.rows[0]){
          setPeople({firstName:'No encontrado', lastName:'No encontrado'})
        }else{
          setPeople(res.data.data.rows[0])
        }
          setInputsLoader(false)
    })
    .catch(err =>{
        console.log(err)
        setInputsLoader(false)
        
    })
    }
    const createNewUser = e => {
      e.preventDefault()

      const password = e.target.password.value
      const repassword = e.target.repassword.value

      if(repassword===password){
        const user = {
        email: e.target.email.value,
        password: e.target.password.value,
        citizenID: e.target.cedula.value,
        role: 1
        }
        console.log(user)
        setFormLoader(true)

        //envio a backend
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/register`
        axios.post(URL,user)
        .then(res => {
          //console.log(res)
          setFormLoader(false)
          setInputsLoader(false)
          setRes(true)
        })
        .catch(err =>{
        console.log(err)
        setFormLoader(false)
        setInputsLoader(false)
        setMessage(err.response.data)
        })  
        //fin de envio backend

      }else{
        setShowError('Contraseñas no coinciden')
    }
  }

  const reseting = ()=>{
    setShowError('')
  }
  if(res){
    return <RegisteredUser/>
  }else{
  return (
    <div className="register-page">
      
    <div className="register-box">
    {formLoader?
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}}>
    <Cargando escala="1"/>
    </div>
    :
    <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>SIGEEL</b></a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">
        Registrate como usuario
  {
    message?
  
  <div className="alert alert-warning alert-dismissible">
  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i className="icon fas fa-exclamation-triangle" /> Alerta!</h5>
  {message}
</div>
:""  
}


      
        </p>
      <form onSubmit={createNewUser}>
      <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Cedula" onChange={findingWord} name="cedula" required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-id-card" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Nombre" value={people?.firstName} />
          <div style={{position:"absolute", right:"10px", top:"5px"}}>
          {inputsLoader?<Cargando escala="0.5"/>:""}
          </div>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
  
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Apellido" value={people?.lastName}/>
          <div style={{position:"absolute", right:"10px", top:"5px"}}>
          {inputsLoader?<Cargando escala="0.5"/>:""}
          </div>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
  
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Email" name='email' />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Contraseña" name='password' required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Repita la contraseña" name='repassword' onChange={reseting} required/>
          <div className="input-group-append">
            <div className="input-group-text"><div className='see-error'>{showError} </div>           
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" required/>
              <label htmlFor="agreeTerms">
                Acepto los terminos y condiciones <a href="#">terms</a>
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Registrar</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      <div className="social-auth-links text-center">
        
      </div>
      <Link to="/" className="text-center">Ya tengo una cuenta</Link>
    </div>
    {/* /.form-box */}
  </div>
}

 

    </div>
    </div>
  )
}
}

export default PreRegister