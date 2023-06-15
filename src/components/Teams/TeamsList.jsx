import React from 'react'
import { Link } from 'react-router-dom'
import MembersMenu from './MembersMenu'

const TeamsList = ({allTeams}) => {

  let count = allTeams?.length
  return (
    <>
    <div className="card">
  <div className="card-header">
    <h3 className="card-title">Todos los Equipos <span className="badge bg-teal">{count}</span></h3>
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
          <th style={{width: '30%'}}> 
            Progreso
          </th>
          
          <th style={{width: '10%'}}>
            tools
          </th>
        </tr>
      </thead>
      <tbody>

        {
            allTeams?.map(team => 
                <tr key={team.id}>
                    <td>
                    <img alt="logo" className="table-avatar" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team.logo}`} style={{height:"40px"}} />
                    </td>
                    <td>
            <a>
            {team.name}
            </a>
            <br />
            <small>
            <Link to={`/teams/${team.id}`} href="#">Ver Equipo</Link>
            
            </small>
          </td>
          <td>
          <ul className="list-inline navbar-nav ml-auto">

            {team.members.map(member=> 
            
            <MembersMenu member={member} key={member.id}/> 
            )}
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
          <div className="btn-group">
  <button type="button" className="btn btn-info btn-sm"><i className="fas fa-sign-in-alt"></i> unirme</button>
</div>
          </td>
                </tr>
            )
        } 
        
      </tbody>
    </table>
  </div>
  {/* /.card-body */}
</div>
</>
  )
}

export default TeamsList