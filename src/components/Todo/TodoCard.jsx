import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TodoCard = ({task}) => {

  const [isLogged, setIsLogged] = useState(localStorage.getItem('token'))

if(isLogged)   
{
return (
   <div className="card" >
  <div className="card-header ui-sortable-handle">
    <h3 className="card-title">
      <i className="ion ion-clipboard mr-1" />
      Tareas
    </h3>
    <div className="card-tools">
    <div className="card-tools">
    
          <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
            <i className="fas fa-minus" />
          </button>
        </div>
  
    </div>
  </div>
  {/* /.card-header */}
  
  <div className="card-body">
    <ul className="todo-list ui-sortable" data-widget="todo-list">
    
        {
          task?.map((tarea) =>
          <li key={tarea.id}>
          {/* checkbox */}
          <span className="handle ui-sortable-handle">
          <i className="fas fa-ellipsis-v" />
          <i className="fas fa-ellipsis-v" />
        </span>

          <div className="icheck-primary d-inline ml-2">
            <input type="checkbox" defaultValue name={tarea.id} id={tarea.id} />
            <label htmlFor={tarea.id} />
          </div>
          {/* todo text */}
          <Link to={`/tasks/${tarea.id}`}>
          <span className="text">{tarea.title}</span>
          </Link>
          {/* Emphasis label */}
          <small className="badge badge-danger"><i className="far fa-clock" />{tarea.limit}</small>
          {/* General tools such as edit or delete*/}
          <div className="tools">
            <i className="fas fa-edit" />
            <i className="fas fa-trash-o" />
          </div>
        </li>
)
}

    </ul>
  </div>
  {/* /.card-body */}
  <div className="card-footer clearfix">
    <Link to='/tasks'>
    <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus" /> Nueva Tarea</button>
    </Link>
  </div>
</div>

)

}else{
    <div></div>
}
}

export default TodoCard