import React from 'react'

const TeamsList = () => {
  return (
    <>
    <div className="card">
  <div className="card-header">
    <h3 className="card-title">Mis Equipos</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  <div className="card-body p-0">
    <table className="table table-striped projects">
      <thead>
        <tr>
          <th style={{width: '1%'}}>
            
          </th>
          <th style={{width: '20%'}}>
            Nombre del Equipo
          </th>
          <th style={{width: '30%'}}>
            Miembros
          </th>
          <th>
            Progreso
          </th>
          <th style={{width: '20%'}}>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            #
          </td>
          <td>
            <a>
              Comunidad La guama
            </a>
            <br />
            <small>
              Created 01.01.2019
            </small>
          </td>
          <td>
            <ul className="list-inline">
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar4.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar5.png" />
              </li>
            </ul>
          </td>
          <td className="project_progress">
            <div className="progress progress-sm">
              <div className="progress-bar bg-green" role="progressbar" aria-valuenow={87} aria-valuemin={0} aria-valuemax={100} style={{width: '87%'}}>
              </div>
            </div>
            <small>
              87% Complete
            </small>
          </td>
          <td className="project-actions text-right">
            <a className="btn btn-primary btn-sm" href="#">
              <i className="fas fa-folder">
              </i>
              View
            </a>
            <a className="btn btn-info btn-sm" href="#">
              <i className="fas fa-pencil-alt">
              </i>
              Edit
            </a>
            <a className="btn btn-danger btn-sm" href="#">
              <i className="fas fa-trash">
              </i>
              Delete
            </a>
          </td>
        </tr>
        <tr>
          <td>
            #
          </td>
          <td>
            <a>
              Calle La Canela
            </a>
            <br />
            <small>
              Created 01.01.2019
            </small>
          </td>
          <td>
            <ul className="list-inline">
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar3.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar4.png" />
              </li>
            </ul>
          </td>
          <td className="project_progress">
            <div className="progress progress-sm">
              <div className="progress-bar bg-green" role="progressbar" style={{width: '57%'}}>
              </div>
            </div>
            <small>
              57% Complete
            </small>
          </td>
          <td className="project-actions text-right">
            <a className="btn btn-primary btn-sm" href="#">
              <i className="fas fa-folder">
              </i>
              View
            </a>
            <a className="btn btn-info btn-sm" href="#">
              <i className="fas fa-pencil-alt">
              </i>
              Edit
            </a>
            <a className="btn btn-danger btn-sm" href="#">
              <i className="fas fa-trash">
              </i>
              Delete
            </a>
          </td>
        </tr>
        <tr>
          <td>
            #
          </td>
          <td>
            <a>
              Movimiento los Hijos de Mamá
            </a>
            <br />
            <small>
              Created 01.01.2019
            </small>
          </td>
          <td>
            <ul className="list-inline">
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar3.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar4.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar5.png" />
              </li>
            </ul>
          </td>
          <td className="project_progress">
            <div className="progress progress-sm">
              <div className="progress-bar bg-green" role="progressbar" aria-valuenow={77} aria-valuemin={0} aria-valuemax={100} style={{width: '77%'}}>
              </div>
            </div>
            <small>
              77% Complete
            </small>
          </td>
          <td className="project-actions text-right">
            <a className="btn btn-primary btn-sm" href="#">
              <i className="fas fa-folder">
              </i>
              View
            </a>
            <a className="btn btn-info btn-sm" href="#">
              <i className="fas fa-pencil-alt">
              </i>
              Edit
            </a>
            <a className="btn btn-danger btn-sm" href="#">
              <i className="fas fa-trash">
              </i>
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  {/* /.card-body */}
</div>
</>
  )
}

export default TeamsList