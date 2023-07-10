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

const TeamView = () => {
  const [team, setTeam] = useState()
  const {id} = useParams()
  const [eliminado, setEliminado] = useState() 
 
  //llamando todos los grupos en el sistema
const getOneteam = (id)=>{
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/team/${id}`
      axios.get(URL,
      getConfig()
      )
      .then(res => {
        setTeam(res.data)
  })
  .catch(err =>{
      console.log(err)
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
        }).then((result) => {
          /* Read more about handling dismissals below */
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
        {/* Profile Image */}
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
              <li className="list-group-item">
                <b>Tareas</b> <a className="float-right">10</a>
              </li>
            </ul>
            <button className="btn btn-danger btn-block" onClick={()=> deleteTeam(id, team?.name)}><b>Eliminar Team</b></button>
          </div>
          {/* /.card-body */}
        </div>
      </div>

      <div className="col-md-9">
        <div className="card card-primary card-outline">
          <div className="card-header p-2">
              <li className="nav-item">
                <div className="nav-link active" href="#activity" data-toggle="tab"><div className="user-block">
                    <img className="img-circle img-bordered-sm" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/teams/${team?.logo}`} alt="user image" />
                    <span className="username">
                      <a href="#">{team?.name}</a>
                      
                    </span>
                    <span className="description">Creado en  - {team?.createdAt.substr(0,10)}</span>
                  </div></div>
                  </li>

          </div>
          <div className="card-body">
            <div className="tab-content">
              <div className="active tab-pane" id="activity">
                {/* Post */}
                <div className="post">
                  
                  {/* /.user-block */}
                  <p>
                    {
                      team?.description
                    }
                  </p>
                </div>
                {/* /.post */}
                {/* Post */}
              </div>
            </div>
          </div>
        </div>
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
    :<div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando escala='1.5'/></div>
  
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