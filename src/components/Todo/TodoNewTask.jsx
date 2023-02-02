import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'

const TodoNewTask = ({getAllTask}) => {
  const [users, setUsers] = useState()

  const getAllUsers = () => {
  axios.get('http://localhost:9000/api/v1/users', getConfig())
  .then(res=>{
    setUsers(res.data)
  })

  .catch(err=>{
    console.log(err)
  })
  }
useEffect(() => {
  getAllUsers()
}, [])




  console.log()
    const handleSubmit = e =>{

        e.preventDefault()
        
 console.log(e.target.title.value)
 console.log(e.target.description.value)
 console.log(e.target.limit.value)
 console.log(e.target.estado.value)
 console.log(e.target.responsible.value)
    

        const URL = `http://localhost:9000/api/v1/todo/`
        axios.post(URL,
          {
            title: e.target.title.value,
            description: e.target.description.value,
            limit: e.target.limit.value,
            isActive: e.target.estado.value,
            responsible: e.target.responsible.value
        }, getConfig())
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
            
            Toast.fire({
              icon: 'success',
              title: 'Ingreso Exitoso'
            })
          }
        )
        .catch(err => {
          console.log(err)
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
            title: 'Error: Se deben completar todas las celdas'

          })
        })
        getAllTask()
      }   

    
  return (
    <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Nueva Tarea </h3>
      
    </div>

<form onSubmit={handleSubmit}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="title">Nombre de la tarea</label>
        <input
          type="text"
          id="title"
          className="form-control"
          />
      </div>

      <div className="form-group">
        <label htmlFor="inputDescription">Descripcion de la tarea</label>
        <input
        name='description'
        type="text"
        id="inputDescription"
        className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor='before'>Completar antes de</label>
        <div className="input-group date" id="reservationdatetime" data-target-input="nearest">
          <input 
          name="limit"
          id="before"
          type="text" className="form-control datetimepicker-input" data-target="#reservationdatetime"
          
          />
          <div className="input-group-append" data-target="#reservationdatetime" data-toggle="datetimepicker">
            <div className="input-group-text"><i className="fa fa-calendar" /></div>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor='estado'>Estado</label>
          <select className="form-control" id='estado' name='estado'>
          <option selected value={true}>Pendiente</option>
          <option value={false}>Completado</option>
        </select>
    </div>

    
    <div className="form-group">
        <label htmlFor='responsible'>Responsable</label>
          <select className="form-control" id='responsible' name='responsible'>
            <option value=''></option>
          {
           users?.map((user) =>
              <option key={user.id} value={user.id}>{user.email}</option>
            )
          }
        </select>
    </div>

      
    
    </div>
    <div className="card-footer clearfix" style={{display: 'block'}}>
      <button type="submit" className="btn btn-primary float-right" onClick={getAllTask}><i className="fas fa-save"></i> Guardar</button></div>
    </form>
  </div>
  )
}

export default TodoNewTask