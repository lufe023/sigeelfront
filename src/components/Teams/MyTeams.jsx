import React from 'react'
import { useState } from 'react'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
import { useEffect } from 'react'
import MembersMenu from './MembersMenu'
import { Link } from 'react-router-dom'

const MyTeams = ({myTeams}) => {
   
        
        let count = myTeams?.length
return (
    <>
    <div className="card">
  <div className="card-header">
    <h3 className="card-title">Mis Equipos <span className="badge bg-teal">{count}</span></h3>
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
            myTeams?.map(team => 
                <tr key={team.id}>
                    <td>
                    <img alt="logo" className="table-avatar" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team.team.logo}`} style={{height:"40px"}} />
                    </td>
                    <td>
            <a>
            {team.team.name}
            </a>
            <br />
            <small>
            <Link  href="#">Ver Equipo</Link>
            
            </small>
          </td>
          <td>
          <ul className="list-inline navbar-nav ml-auto">
            {team.team.members.map(member=> 
            
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
  <button type="button" className="btn btn-danger btn-sm"><i className="fas fa-sign-out-alt"></i> Abandonar</button>
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

export default MyTeams