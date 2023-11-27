import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import { Link , useParams, Navigate  } from 'react-router-dom'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import AdUserToTeam from './AdUserToTeam'
import TeamMembersTodo from './TeamMembersTodo'
import Swal from 'sweetalert2'
import Cargando from '../../utils/Cargando'
import Error404 from '../Error404'
import { useNavigate } from 'react-router-dom';
import TeamEdit from './TeamEdit'

const TeamView = () => {
  const [team, setTeam] = useState()
  const {id} = useParams()
  const [eliminado, setEliminado] = useState() 
  const [isLoading, setIsloading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const navigate = useNavigate();
  
  //llamando todos los grupos en el sistema
const getOneteam = (id)=>{
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/team/${id}`
      axios.get(URL,
      getConfig()
      )
      .then(res => {

        setTeam(res.data)
        setIsloading(false)
  })
  .catch(err =>{
      console.log(err)
      setIsloading(3)
  })
  }

  useEffect(() => {
    getOneteam(id)
  }, [])

  const deleteTeam = (teamId, teamName) => {

    Swal.fire({
      title: `¿Seguro quieres Elimnar a ${teamName}?`,
      text: `Esta accion no se puede deshacer y los miembros de ${teamName} quedarán sin dirección`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Dejar sin efecto",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Eliminado!',
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
            setEliminado(true)
          }
      
            
            
        })
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/${teamId}`
        axios.delete(URL, {
          headers:{
            Authorization: getConfig().headers.Authorization,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          
          Swal.fire(
            'Eliminado!',
            'El Equipo se eliminó con éxito',
            'success'
            
            )
            navigate('/teams');
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

  
const setTeamLeader = (memberId, teamId, value, liderName) => {

  Swal.fire({
    title: `¿Seguro quieres ${value?' establecer ': 'quitar'} a este lider de equipo`,
    text: `con esta acción ${liderName}${value?' será ': ' ya no será '} Lider de este equipo`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: "Dejar sin efecto",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Proceder!'
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval
      Swal.fire({
        title: 'Eliminado!',
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
          setEliminado(true)
        }
      })
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/setteamleader`;
    axios.patch(URL, {memberId, teamId, value}, getConfig())
      .then(res => {
        getOneteam(team.id)
        Swal.fire(
          'Lider Cambiado',
          'El lider ha sido cambiado con éxito',
          'success'
          )
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: `Oops...`,
          text: `${error.response.data.message}`,
        })
      })
    }
  })

}
  
  
  

  if(eliminado!=false){
  return (
    <>
    <Header/>
    <Aside/>
    {
      team?
    <div className='content-wrapper'>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Visualización de equipo</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to="/teams">Teams</Link></li>
              <li className="breadcrumb-item active">{team?.name}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  
  <section className="content">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
          <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              <img className="profile-user-img img-fluid img-circle" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team?.logo}`} alt="User profile picture" />
            </div>
            <h3 className="profile-username text-center">{team?.name}</h3>
            <p className="text-muted text-center">{team?.woner.censu.firstName}</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b>Miembros</b> <a className="float-right">{team?.members.length}</a>
              </li>
              {
              team?.members.map(member => 
                <li key={member.id} className="list-group-item">
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                  <Link to={`/peoplebyuser/${member?.memberId}`}>
                  {member.memberData.censu.firstName}
                  </Link>
                    <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" type="checkbox" id={member.id} checked={member.teamLeader} onClick={()=> setTeamLeader(member.memberId, team.id, !member.teamLeader, member.memberData.censu.firstName)} />
                    <label htmlFor={member.id} className="custom-control-label">Lider</label>
                  </div>
                  </div>
                </li>
              )
              }
            </ul>
            <div className="btn-group col-12">

            <button className="btn btn-danger  " onClick={()=> deleteTeam(id, team?.name)}><b>Eliminar</b></button>

            <button className="btn btn-warning  " onClick={()=> setIsEditing(true)}><b>Editar</b></button>
            </div>
          </div>
          {/* /.card-body */}
        </div>
      </div>

      <div className="col-md-9">
      {
          isEditing?<TeamEdit team={team} setIsEditing={setIsEditing} getOneteam={getOneteam}/>:
        <div className="card card-primary card-outline">
          <div className="card-header p-2">
              <li className="nav-item">
                <div className="nav-link active" href="#activity" data-toggle="tab"><div className="user-block">
                    <img className="img-circle img-bordered-sm" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team?.logo}`} alt="user image" />
                    <span className="username">
                      <Link>{team?.name}</Link>
                      
                    </span>
                    <span className="description">Creado en  - {team?.createdAt.substr(0,10)}</span>
                  </div></div>
                  </li>

          </div>
          <div className="card-body">
            <div className="tab-content">
              <div className="active tab-pane" id="activity">
                <div className="post">
                  <p>
                    {
                      team?.description
                    }
                  </p>
                  <h5>Link grupo de Whatsapp</h5>
                    <p style={{display:"flex", alignItems:"center", gap:"20px"}}>
                    <i className="fab fa-whatsapp"  style={{fontSize:"50px", color:"green"}}/>
                    <Link>
                      {
                        team?.whatsapp
                      }
                      </Link>
                    </p>
          
                </div>
              </div>
              
            </div>
            
          </div>
          <div className="card-footer">
          
          </div>
        </div>
  }
        <div className="card card-primary card-outline">
        <div className="card-body">
        {/* <SelectUsuarios/>  */}
        <AdUserToTeam teamId={team?.id} getOneteam={getOneteam}/>
        </div>

        </div>
      </div>

    </div>

    <div className="row">
      {
    team?.members.map(member => 
      <TeamMembersTodo key={member.id} member={member} getOneteam={getOneteam}/>
    )
    }
    </div>
  </div>
  

</section>

    </div>
    :""
  
  }
  {
  isLoading ==true?<div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando escala='1.5'/></div>:""
  }

{
  isLoading ===3?<Error404/>:""
  }
    <Footer/>
    </>

  )
  }else{
    return(
      <Navigate to='/teams' />
    )
  }
}

export default TeamView