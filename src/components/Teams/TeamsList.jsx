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
          <td className="project-actions text-right">
          <div className="btn-group">
  <button type="button" className="btn btn-info btn-sm" onClick={()=> joinToTeam(team.id, id)}><i className="fas fa-sign-in-alt"></i> unirme</button>
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