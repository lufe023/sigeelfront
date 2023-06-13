import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Content from '../Content'
import Footer from '../Footer'
import NewTeam from './NewTeam'
import TeamsList from './TeamsList'
import MyTeams from './MyTeams'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'

const Teams = () => {
  
  const [myTeams, setMyTeams] = useState()
  const [allTeams, setAllTeams] = useState()


  //llamando los grupos a los que pertenece un usuario
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

//llamando todos los grupos en el sistema
const getAllteams = ()=>{
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams`
      axios.get(URL,
      getConfig()
      )
      .then(res => {
        setAllTeams(res.data)
  })
  .catch(err =>{
      console.log(err)
  })
  }


      useEffect(() => {
        getAllteams()
      getMyteams()
      }, [])

  return (
    <>
    <Header/>
    <Aside/>
    <div className='content-wrapper'>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Equipos</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Equipos</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  
<section className="content">
<NewTeam/>
{
  myTeams?<MyTeams myTeams={myTeams}/>: <div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando escala='1.5'/></div>
}

{
  allTeams?<TeamsList allTeams={allTeams}/>:  <div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando escala='1.5'/></div>
}

</section>
    </div>
    
    <Footer/>
    </>
  )
}

export default Teams