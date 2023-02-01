import axios from 'axios';
import Cargando from '../../utils/Cargando';
import getConfig from '../../utils/getConfig';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const TodoEditing = ({getAllTask, editingTask, setEditingTask}) => {
  //codigo para abrir el calendario




  //efectos de guardado
  $('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

  $('#switch').each(function(){
    $(this).bootstrapSwitch('state', $(this).prop('checked'));
  })

  

  const {register, handleSubmit, reset} = useForm()  

    const submit = data => {
      console.log(data)
      const URL = `http://localhost:9000/api/v1/todo/${editingTask.id}`
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
          title: 'huvo un error'
        })
      })
      reset({
      })
    }

  return (
    <div className="card card-warning">
    <div className="card-header">
      <h3 className="card-title">Editar Tarea </h3>
      
    </div>

<form onSubmit={handleSubmit(submit)}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="title">Nombre de la tarea</label>
        <input
        {...register('title')}
          type="text"
          id="title"
          className="form-control"
          defaultValue={editingTask?.title} />
      </div>

      <div className="form-group">
        <label htmlFor="inputDescription">Descripcion de la tarea</label>
        <input
        {...register('description')}
        type="text"
        id="inputDescription"
        className="form-control"
        defaultValue={editingTask?.description}/>
      </div>

      <div className="form-group">
        <label htmlFor='before'>Completar antes de</label>
        <div className="input-group date" id="reservationdatetime" data-target-input="nearest">
          <input
          {...register('limit')}
          id="before"
          type="text" className="form-control datetimepicker-input" data-target="#reservationdatetime" defaultValue={editingTask?.limit}/>
          <div className="input-group-append" data-target="#reservationdatetime" data-toggle="datetimepicker">
            <div className="input-group-text"><i className="fa fa-calendar" /></div>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor='estado'>Select</label>
          <select {...register('isActive')} className="form-control" id='estado'>
          { editingTask?.isActive?<option selected value={'true'}>Pendiente</option>:<option value={'true'}>Pendiente</option>}
          
          {editingTask?.isActive?<option value={'false'}>Completada</option>:<option selected value={'false'}>Completada</option>}
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
      <button type="submit" className="btn btn-primary float-right" onClick={getAllTask}><i className="fas fa-save"></i> Guardar</button></div>
    </form>
 
 

  </div>


  )
}

export default TodoEditing