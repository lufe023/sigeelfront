import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import TodoCard from './TodoCard'
import TodoEdit from './TodoEdit'
import TodoNewTask from './TodoNewTask'

const TasksBoard = () => {

  //funcion para seleccionar fecha y hora estilizados
    $('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

  const [editingTask, setEditingTask] = useState([])
  const [task, setTask] = useState()

const getAllTask = ()=>{
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/todo`
    axios.get(URL, getConfig())
    .then(res => {
    setTask(res.data)
    })
    .catch(err => console.log(err))
}
useEffect(() => {
getAllTask()
}, [])


//peticion a api por id usando useparans

const {id} = useParams()
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
          <h1>Editar tarea</h1>
        </div>
      <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active">Editar tarea</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
  <div className="row">
    <div className="col-md-6">
      {
        id?<TodoEdit getAllTask={getAllTask} editingTask={editingTask} setEditingTask={setEditingTask}/>
        :
        <TodoNewTask getAllTask={getAllTask}/>
      }

    </div>
    <div className="col-md-6">
      <TodoCard task={task} setTask={setTask}/>
    </div>
  </div>
    
  </section>
</div>
<Footer/>
</div>
  )
}

export default TasksBoard