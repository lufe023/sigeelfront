import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import Cargando from '../../utils/Cargando'
import AllUsers from './AllUsers'

const UserDashBoard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const estilos = {
    cursor:{
      cursor: "pointer"
    }
  }

  
  const getAllUsers = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users?offset=0&limit=20`
      axios.get(URL, getConfig())
      .then(res => {
        setUsers(res.data.results)
        setLoading(false)
      })
      .catch(err =>{
        console.log(err)
        setLoading(false)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: `Accion no permitida: ${err.response.statusText}`
        })
      })
      
  }

  const userDisable = (user, active) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${user}`
        axios.patch(URL, {active:active}, getConfig())
        .then(res =>
          {
            getAllUsers()
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
              title: 'Cambio Exitoso'
            })
          }
        )
        .catch(err => {
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
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Accion no realizada'
          })
        })
    }
  useEffect(() => {
  getAllUsers()
  }, [])
  return (
    <div>
        <Header/>
        <Aside/>
        <div className="content-wrapper">
            <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Colaboradores</h1>
        </div>
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active">Colaboradores</li>
            </ol>
            </div>
      </div>
    </div>
  </section>
  <section className="content">
  <div className="row">
    <div className="col-12">
      <AllUsers users={users}/>
    </div>
    </div>
  <div className="row">
    <div className="col-12">
  <div className="card">
  <div className="card-header">
    <h3 className="card-title">Colaboradores</h3>
    <div className="card-tools">
      <div className="input-group input-group-sm" style={{width: 150}}>
        <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-default">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* /.card-header */} 
  <div className="card-body table-responsive p-0" style={{height: 300}}>
  {
    loading?<div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='1.5'/>
    </div>
  :
    <table className="table table-head-fixed text-nowrap">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Contacto</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
        users?.map((user) => 
          <tr key={user.id}>
            <td>
            <img className="img-circle img-bordered-sm" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${user?.censu?.picture}`}  alt="user image" style={{height:'40px'}} />
            </td>
            <td>{`${user.censu.first_name} ${user.censu.last_name}`}</td>
            <td>{user.user_role.roleName} </td>
            <td>
              <ul style={{padding:'0'}}>
                <li>
              {user.email}
              </li>
              <li>
                <a href={`tel:{user.censu.celphone}`}>
              {user.censu.celphone}
              </a>
              </li>
              </ul>
               </td>
            <td>{user.active?<i className="fas fa-circle" style={{color:"green"}}></i>:<i className="fas fa-circle" style={{color:"red"}}></i>} </td>
            <td>
            <div className="btn-group">
  <button type="button" className="btn btn-default">Acciones</button>
  <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
    <span className="sr-only">Toggle Dropdown</span>
  </button>
  <div className="dropdown-menu" role="menu" style={{}}>
    <a className="dropdown-item" href="#">Perfil</a>
    <Link className="dropdown-item" to={`/peoplebyuser/${user.id}`}>Seguimiento</Link>
    <div className="dropdown-divider" />
    {
      user.active?<a className="dropdown-item" style={estilos.cursor} onClick={()=> userDisable(user.id, false)}>Desactivar</a>
      : <a className="dropdown-item" style={estilos.cursor} onClick={()=> userDisable(user.id, true)}>Activar</a>
    }
    <a className="dropdown-item" href="#">Administrar</a>
  </div>
</div>


            </td>

          </tr>
        )
        }
       
       
      </tbody>
    </table>
}

  </div>
  {/* /.card-body */}
</div>



    </div>

  </div>
    
  </section>
        </div>
<Footer/>
</div>
  )
}

export default UserDashBoard