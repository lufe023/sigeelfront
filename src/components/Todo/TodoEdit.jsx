import axios from 'axios'
import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'
import Cargando from '../../utils/Cargando'
import { Link, useParams } from 'react-router-dom'

const TodoEdit = ({getAllTask, editingTask, setIdEditingTask}) => {

    const handleSubmit = e =>{

        e.preventDefault()
        
        const data = {
            title: e.target.title.value,
            description: e.target.description.value,
            limit: e.target.limit.value,
            isActive: e.target.estado.value
        }
        const {id} = useParams()

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/todo/${id}`
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
        getAllTask()
      }   

    return (
    <div className="card card-warning">
    <div className="card-header">
      <h3 className="card-title">Editar Tarea </h3>
    </div>
<form onSubmit={handleSubmit}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="title">Nombre de la tarea</label>
        <input
          type="text"
          id="title"
          className="form-control"
          defaultValue={editingTask?.title} />
      </div>

      <div className="form-group">
        
        <label htmlFor="inputDescription">Descripcion de la tarea</label>
        <textarea className="form-control" rows="3" defaultValue={editingTask?.description} name='description'>
          
        </textarea>
      </div>

      <div className="form-group">
        <label htmlFor='before'>Completar antes de</label>
        <div className="input-group date" id="reservationdatetime" data-target-input="nearest">
          <input 
          name="limit"
          id="before"
          type="text" className="form-control datetimepicker-input" data-target="#reservationdatetime" value={editingTask?.limit}/>
          <div className="input-group-append" data-target="#reservationdatetime" data-toggle="datetimepicker">
            <div className="input-group-text"><i className="fa fa-calendar" /></div>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor='estado'>Estado</label>
          <select className="form-control" id='estado' name='estado'>
            <option value={true}>selecciona una opcion</option>
            <option value={true}>Pendiente</option>
            <option value=''>Completada</option>
          </select>
    </div>


      <div className="form-group">
        <label htmlFor="inputClientCompany">Responsable</label>
        <input type="text" id="inputClientCompany" className="form-control" value={editingTask.Responsible?.email} disabled/>
      </div>
      <div className="form-group">
        <label htmlFor="inputProjectLeader">Creado por</label>
        <input type="text" id="inputProjectLeader" className="form-control" value={editingTask.Creador?.email}  disabled />
      </div>
    </div>
    <div className="card-footer clearfix" style={{display: 'block'}}>

    <button type="button" className="btn btn-danger">
      <i className="fas fa-ban"/> Cancelar
    </button>
      <button type="submit" className="btn btn-primary float-right" onClick={getAllTask}>
      <i className="fas fa-save"></i> Guardar</button> </div>
    </form>

  </div>
  )
 }
export default TodoEdit