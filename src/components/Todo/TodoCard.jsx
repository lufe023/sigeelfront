
import { Link } from 'react-router-dom'

const TodoCard = ({task, setLoading}) => {

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
          <li key={tarea.id} className={tarea.isActive? '' : 'done'}>
          {/* checkbox */}
          <div className="icheck-primary d-inline ml-2">
          <Link to={`/tasks/${tarea.id}`} onClick={()=> setLoading(true)}>
            <span className="text">{tarea.title} </span> 
          </Link>
          </div>
          {
          tarea.isActive?
          <small  className='badge  badge-danger'>
            <i className="far fa-clock" />{tarea.limit}</small>
          :
          <small  className='badge  badge-success'>
          <i className="far fa-clock" />{tarea.limit}</small> 
          }

          <small className='badge'>
          <i className="fas fa-lock" style={{marginRight:'5px'}}/> 
          {tarea.Creador.email}
          </small>
          {/* General tools such as edit or delete*/}
          <div className="tools">
          <Link to={`/tasks/${tarea.id}`} onClick={()=> setLoading(true)}>
            <i className="fas fa-edit" />
            <i className="fas fa-trash-o" />
          </Link>
          </div>
        </li>
)
}

    </ul>
  </div>
  {/* /.card-body */}
  
</div>

)


}

export default TodoCard