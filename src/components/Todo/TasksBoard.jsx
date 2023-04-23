import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import TodoCard from './TodoCard'
import TodoEdit from './TodoEdit'
import TodoNewTask from './TodoNewTask'
import Cargando from '../../utils/Cargando'

const TasksBoard = () => {

  //funcion para seleccionar fecha y hora estilizados
    $('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

  const [editingTask, setEditingTask] = useState([])
  const [task, setTask] = useState()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState()

const getAllTask = ()=>{
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/todo`
    axios.get(URL, getConfig())
    .then(res => {
    setTask(res.data)
    setLoading(false)
    })
    .catch(err => console.log(err))
}
useEffect(() => {
getAllTask()
}, [])


//peticion a api por id usando useparans


  useEffect(() => {
    if(id){
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/todo/${id}`
    axios.get(URL, getConfig())
    .then(res => {
      setEditingTask(res.data[0])
      })
      .catch(err => console.log(err))
    }
  }, [id])

  return (
    <div>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Mis Tareas</h1>
        </div>
      <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to='/dashboard'>Dashboard</Link></li>
            <li className="breadcrumb-item active">Editar tarea</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
  <div className="row">
      {
        editingTask?<div className="col-md-12">
        <TodoEdit getAllTask={getAllTask} editingTask={editingTask} setIdEditingTask={setIdEditingTask}/>
        </div>
        : ""
        
      }

    </div>
    {
      id? ""
    : <div className="row">
    <div className="col-md-6"><TodoNewTask getAllTask={getAllTask}/></div>
    <div className="col-md-6">
      <TodoCard task={task} setTask={setTask} setId={setId}/>
    </div>
  </div>
  }
  </section>
  </div>
<Footer/>
</div>
  )
}

export default TasksBoard