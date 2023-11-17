import React from 'react'
import { Link } from 'react-router-dom'
import MembersMenu from './MembersMenu'
import getConfig from '../../utils/getConfig';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TeamsList = ({allTeams, getMyteams}) => {
  const id = useSelector(state=> state.userSlice.id)

  const joinToTeam = (teamId, id) => {

    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/${teamId}`;
      
    axios.post(URL, {members:[id]}, getConfig() )
    
      .then(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        Toast.fire({
          icon: 'success',
          title: `fue agregado con éxito`
        });
        getMyteams()
      })
      .catch(error => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
  
        Toast.fire({
          icon: 'error',
          title: `Hubo un error: `
        });
      });
  };

  let count = allTeams?.length
  return (
    <>
    <div className="card">
    <div className="card-header">
    <h3 className="card-title">Todos los Equipos <span className="badge bg-teal">{count}</span></h3>
    </div>
  </div>
    <div className="row">
    
  
    {
    allTeams?.map(team => 

<div key={team.id} className="col-md-4" >
{console.log(team)}
  
  <div className="card card-widget widget-user">
  
    <div className="widget-user-header bg-info">
    
      <h5 className="widget-user-desc" style={{marginTop:"20px"}}>{team.name}</h5>
    </div>
    <div className="widget-user-image">
    {/* <img alt="logo" className="table-avatar" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team.logo}`} style={{height:"40px"}} /> */}
      <img className="img-circle elevation-2"  src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team.logo}`} alt="User Avatar" />
    </div>
    <div className="card-footer">
    <p>{team.description}</p>
    <ul className='products-list product-list-in-card pl-2 pr-2'>
    {team.members.map(member=>   
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
<Link to={`/teams/${team.id}`} className='btn btn-primary '>Ver Equipo</Link>
  {team?.whatsapp?
  <a className='btn btn-success' href={`${team.whatsapp}`} target='blank'> <i className="fab fa-whatsapp" /> Whatsapp</a>:""
}
  <button className="btn btn-info" onClick={()=> joinToTeam(team.id, id)}><i className="fas fa-sign-in-alt"></i> unirme</button>
</div>
    </div>
  </div>
  {/* /.widget-user */}
</div>
)}
</div>

</>
  )
}

export default TeamsList