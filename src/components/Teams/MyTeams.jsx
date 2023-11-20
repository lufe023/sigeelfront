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
    
  </div>
  </div>

 <div  className="row">
{
  myTeams?.map(team => 

  <div key={team.id} className=" col-md-4">
      {console.log(team)}
    <div className="card card-primary collapsed-card">
      <div className="card-header">
        <h3 className="card-title">{team.team.name}</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus" />
          </button>
        </div>
        {/* /.card-tools */}
      </div>
      {/* /.card-header */}
      <div className="card-body">
        <p>
        <img alt="logo" className="" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team.team.logo}`} style={{width:"100%"}} />
        {team.team.description}
        </p>

      <ul className='products-list product-list-in-card pl-2 pr-2'>
      {team?.team?.members.map(member=>   
    <li key={member.id} className="item" style={{backgroundColor:"#00000008"}}>
    <div className="product-img">
    <Link className="product-title" to={`/mypeople/${member.memberData.censu.id}`}>
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${member.memberData.censu.picture}`} alt="Product Image" className="img-size-50" />
    </Link>
    </div>
    <div className="product-info">
      <Link className="product-title" to={`/mypeople/${member.memberData.censu.id}`}>{member.memberData.censu.firstName}
      {member.teamLeader?
      <span className="badge float-right badge-success">Lider del Equipo</span>
      :""}
      </Link>
      <span className="product-description">{member.memberData.email}</span>
      </div>
      </li>
    )}
</ul> 
      </div>
      <div className="card-footer">
      <div className="btn-group col-12">
      <Link className='btn btn-info' to={`/teams/${team.teamId}`} href="#">Ver Equipo</Link>

      <button type="button" className="btn btn-danger btn-sm" onClick={()=> exitFromTeam(team.memberId, team.teamId,team.team.name)}>
        <i className="fas fa-sign-out-alt"></i> Abandonar
      </button>
  </div>
      </div>
    </div>
    {/* /.card */}
  </div>
)}
</div>


</>
  )
}

export default MyTeams