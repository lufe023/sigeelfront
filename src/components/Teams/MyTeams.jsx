import React from 'react'
import { useState } from 'react'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
import { useEffect } from 'react'

const MyTeams = () => {
    const [myTeams, setMyTeams] = useState()

    const getMyteams = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/myteams`
            axios.get(URL,
            getConfig()
            )
            .then(res => {
                setMyTeams(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
        }

        useEffect(() => {

        getMyteams()
        }, [])
        
        let count = myTeams?.length
return (
    <>
    <div className="card">
  <div className="card-header">
    <h3 className="card-title">Mis Equipos <span> ({count})</span></h3>
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

        {
            myTeams?.map(team => 
                <tr key={team.id}>
                    <td>
                    <img alt="logo" className="table-avatar" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team.team.logo}`} style={{height:"40px"}} />
                    </td>
                    <td>
            <a>
              {console.log(team)}
            {team.team.name}
            </a>
            <br />
            <small>
              {team.team.createdAt}
            </small>
          </td>
          <td>
          <ul className="list-inline">
            {team.team.members.map(member=> 
            
              <li className="list-inline-item">
                <img
                className="table-avatar"
                src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${member.memberData.censu.picture}`}
                style={{height:"40px"}}
                alt={member.memberData.censu.firstName}/>
              </li>            
            
            )}
            </ul>
            {/* <ul className="list-inline">
              <li className="list-inline-item">

                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar4.png" />
              </li>
              <li className="list-inline-item">
                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar5.png" />
              </li>
            </ul> */}
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