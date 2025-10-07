import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'
import Cargando from '../../utils/Cargando'
import { Link, useParams, redirect} from 'react-router-dom'

const TodoEdit = ({setEditingTask, editingTask, getAllTask}) => {



const [defaultValue, setDefaultValue] = useState({
  title: editingTask?.title,
  description: editingTask?.description,
  limit: editingTask?.limit,
  isActive: editingTask.isActive
})

    const handleSubmit = e =>{

        e.preventDefault()
        
        const data = {
            title: e.target.title.value,
            description: e.target.description.value,
            limit: e.target.limit.value,
            isActive: e.target.estado.value
        }

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/todo/${editingTask.id}`
        axios.patch(URL,
        data, getConfig())
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
            title: 'No se pudo realizar la actualización'
          })
        })

        
    }

      const fechaIso8601 = editingTask?.limit

      const fecha = new Date(fechaIso8601)

      const fechaFormateada = fecha.toISOString().slice(0,16)

    return (
    <div className="card card-warning">

    <div className="card-header">
      <h3 className="card-title">Editar Tarea </h3>
    </div>

    {
    editingTask?""
    :
    <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
  <Cargando escala='1.5'/>
  </div>
  }

<form onSubmit={handleSubmit}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="title">Nombre de la tarea</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={defaultValue.title}
          onChange={(e) => setDefaultValue({...defaultValue, title: e.target.value})}
          />
      </div>
    
      <div className="form-group">
        <label htmlFor="inputDescription">Descripcion de la tarea</label>
        <textarea className="form-control"
        rows="3"
        value={defaultValue.description}
        name='description'
        onChange={(e) => setDefaultValue({...defaultValue, description: e.target.value})}
        >
        </textarea>
      </div>

    <div className="form-group">
      <label>Fecha Limite</label>
      <input
      type="datetime-local"
      className="form-control"
      name="limit"
      defaultValue={fechaFormateada}
      onChange={(e) => setDefaultValue({...defaultValue, limit: e.target.value})}
      />
      <div className="input-group date" id="reservationdatetime" data-target-input="nearest">
      </div>
    </div>
      <div className="form-group">
        <label htmlFor='estado'>Estado</label>
          <select className="form-control" id='estado' name='estado' defaultValue={defaultValue.isActive} onChange={(e) => setDefaultValue({...defaultValue, isActive: e.target.value})}>
            <option value={true}>Pendiente</option>
            <option value={false}>Completada</option>
          </select>
    </div>
      <div className="form-group">
        <label htmlFor="inputClientCompany">Responsable</label>
        <input type="text" id="inputClientCompany" className="form-control" value={editingTask?.Responsible?.email} disabled/>
      </div>
      <div className="form-group">
        <label htmlFor="inputProjectLeader">Creado por</label>
        <input type="text" id="inputProjectLeader" className="form-control" value={editingTask?.Creador?.email}  disabled />
      </div>
    </div>
    <div className="card-footer clearfix" style={{display: 'block'}}>

    <Link type="button" className="btn btn-danger" to="/tasks"  onClick={(e) => {setEditingTask(), getAllTask()}} >
      <i className="fas fa-ban"/> Salir
    </Link>
    <button type="submit" className="btn btn-primary float-right">
    <i className="fas fa-save"></i> Aplicar</button>
    </div>
    </form>

  </div>
  )
}
export default TodoEdit