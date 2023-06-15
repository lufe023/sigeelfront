import React from 'react'
import { useState } from 'react'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
import { useEffect } from 'react'
import MembersMenu from './MembersMenu'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const MyTeams = ({myTeams, getMyteams}) => {

  const exitFromTeam = (memberId, teamId, TeamName) => {
    Swal.fire({
      title: `¿Seguro quieres abandonar a ${TeamName}?`,
      text: `Recuerda la importancia de estar agrupado`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Dejar sin efecto",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo salirme!'
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Hasta pronto!',
          timer: 0,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
        })
        const data = {
          teamId,
          memberId
        }

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams`
        axios.delete(URL, {
          data:data,
          headers:{
            Authorization: getConfig().headers.Authorization,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          Swal.fire(
            'Eliminando',
            'Accion realizada con éxito',
            'success'
          )
          getMyteams()     
    })
    .catch(err =>{

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error!',
          
        })
    })
      }
    })
  
  }


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
            <Link to={`/teams/${team.teamId}`} href="#">Ver Equipo</Link>
            
            </small>
          </td>
          <td>
          <ul className="list-inline navbar-nav ml-auto">
            {team.team.members.map(member=> 
            
            <MembersMenu member={member} key={member.id}/> 
            )}
            </ul>
          </td>
          <td className="project-actions text-right">
          <div className="btn-group">
  <button type="button" className="btn btn-danger btn-sm" onClick={()=> exitFromTeam(team.memberId, team.teamId,team.team.name)}><i className="fas fa-sign-out-alt"></i> Abandonar</button>
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