import React from 'react'
import getConfig from '../../utils/getConfig';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeamMembersTodo = ({member, getOneteam}) => {

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
let  randomColor = getRandomColor()

const exitFromTeam = (memberId, teamId, memberName) => {
  Swal.fire({
    title: `¿Seguro quieres expulsar a ${memberName}?`,
    text: `Ya no se mostraran los datos de ${memberName} en este grupo`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: "Dejar sin efecto",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, expulsar!'
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval
      Swal.fire({
        title: 'Expulsando!',
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
        getOneteam(teamId)
        Swal.fire(
          'Expulsado',
          'Accion realizada con éxito',
          'success'
        )
    
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

const obtenerFechaActual = () => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Agregar cero inicial si el mes es menor a 10
  const dia = String(fechaActual.getDate()).padStart(2, '0'); // Agregar cero inicial si el día es menor a 10
  const horas = String(fechaActual.getHours()).padStart(2, '0'); // Agregar cero inicial si las horas son menores a 10
  const minutos = String(fechaActual.getMinutes()).padStart(2, '0'); // Agregar cero inicial si los minutos son menores a 10
  const segundos = String(fechaActual.getSeconds()).padStart(2, '0'); // Agregar cero inicial si los segundos son menores a 10
  const milisegundos = String(fechaActual.getMilliseconds()).padStart(3, '0'); // Agregar ceros iniciales si los milisegundos son menores a 100 o 10
  
  return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milisegundos}Z`;
};

const fechaHoy = obtenerFechaActual();

  return (
    <>
    <div className="col-md-6">
        <div className='card collapsed-card'>
        <div className="card-header">
  <h3 className="card-title">{member?.memberData.censu.firstName}</h3>
  <div className="card-tools">
    <button type="button" className="btn btn-tool" data-card-widget="collapse">
      <i className="fas fa-plus" />
    </button>
  </div>
</div>
<div className='card-body'>
<div className='row'>
    <div className="col-md-3">
    <div className="card card-primary card-outline" style={{borderTop:`3px solid ${randomColor}`}}>
          <div className="card-body box-profile">
            <div className="text-center">
              <img className="profile-user-img img-fluid img-circle" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${member.memberData.censu.picture}`} alt="User profile picture" />
            </div>
            <Link to={`/peoplebyuser/${member?.memberId}`}>
            <h3 className="profile-username text-center">{member?.memberData.censu.firstName}</h3>
            </Link>
            <p className="text-muted text-center">{member.teamLeader?"Team Leader":"Miembro"}</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b>Telefono</b> <a href={`tel:${member.memberData.censu.celphone}`} className="float-right">{member.memberData.censu.celphone}</a>
              </li>
              <li className="list-group-item">
                <b>Tareas</b> <a className="float-right">{member.memberData.tasks.length}</a>
              </li>
            </ul>
            <a href="#" className="btn btn-danger btn-block" onClick={()=> exitFromTeam(member.memberId, member.teamId, member.memberData.censu.firstName)}><b>Expulsar</b></a>
          </div>
          {/* /.card-body */}
        </div>

    </div>

    <div className="col-md-9">
      
    <div className="card card-primary card-outline" style={{borderTop:`3px solid ${randomColor}`}}>
        
    <div className="card-body">
      {
        member.memberData.tasks?.map(task => 
          
          <div key={task.id}
          className={task.isActive==""?"callout callout-success":task.limit.substring(0,10)<fechaHoy.substring(0,10)?"callout callout-danger":task.limit.substring(0,10)>=fechaHoy.substring(0,10)? "callout callout-warning":""}>
            
            <h5>{task.title}</h5>
            {task.isActive?<p>{task.description.substring(0,99)}</p>:""}
            {task.isActive?<p>Fecha Limite:<b>{task.limit.substring(0,10)}</b></p>:""}
        
          </div>
          )
      }
</div>

        </div>
      
      
      </div>
                </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default TeamMembersTodo