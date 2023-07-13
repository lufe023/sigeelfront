import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import GPS from './GPS'
import CitizenForm from './Forms/CitizenForm'
import Cargando from '../../utils/Cargando'
import AddTies from './AddTies'
import ShowTies from './Ties/ShowTies'
import NearbyCitizen from './Complements/NearbyCitizen'
import ActivityCard from './Complements/ActivityCard'
import ParticipationForm from './Contact/Participation'
import BenefitForm from './Contact/BenefitForm '
import BenefitCard from './Complements/BenefitCard'
import Jobs from './Contact/Jobs'
import JobCard from './Complements/JobCard'
import LocationPicker from './Contact/LocationPicker'
import NewConditions from './Contact/NewCondition'
import UpdateConditions from './Contact/UpdateConditions'

const People = () => {
  const [people, setPeople] = useState()
  const [ties, setTies] = useState()
  const {id} = useParams()

  const getPeople = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/${id}`
      axios.get(URL, getConfig())
      .then(res => {
        setPeople(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getPeople()
    getTies()
  }, [id])

  const getTies = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/${people?.citizenID}`
      axios.get(URL, getConfig())
      .then(res => {
        setTies(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getTies()
  }, [people])

  return (
    <div>
        <Header/>
        <Aside/>
        <div className="content-wrapper">
  <section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Perfil del Ciudadano</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to='/dashboard'>Dashboard</Link></li>
          <li className="breadcrumb-item"><Link to='/mypeople' >My People</Link></li>
          <li className="breadcrumb-item active">Perfil del  Ciudadano</li>
        </ol>
      </div>
    </div>
  </div>
</section>

  <section className="content">
  <div className="container-fluid">
  {
    people?
    <div className="row">
      <div className="col-md-3">
        {/* Profile Image */}
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              <img className="profile-user-img img-fluid img-circle" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="User profile picture" />
            </div>
            <h3 className="profile-username text-center">{people?.firstName} {people?.lastName}</h3>
            <p className="text-muted text-center">{people?.nickname}</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b>Vecindario</b> <a className="float-right">{people?.neighbourhoods?.name}</a>
              </li>
              <li className="list-group-item">
                <b>Distrito Municipal</b> <a className="float-right">{people?.districts?.name}</a>
              </li>
              <li className="list-group-item">
                <b>Municipio</b> <a className="float-right">{people?.municipalities?.name}</a>
              </li>
              <li className="list-group-item">
                <b>Provincia</b> <a className="float-right">{people?.provinces?.name}</a>
              </li>
              
            </ul>

            <strong><i className="far fa-file-alt mr-1" /> Notas</strong>
            <p className="text-muted">Esta persona vive bajando el rio, entrando detras de la mata de mango siempre anda con rosita</p>
            <a href="#" className="btn btn-primary btn-block"><b>Editar</b></a>
          </div>
        </div>
        {
          people?<ParticipationForm citizenID={people?.citizenID} getPeople={getPeople}/>:""
        }
        {
          people?<BenefitForm citizenID={people?.citizenID} getPeople={getPeople} />:""
        }
        {
          people?<Jobs citizenID={people?.citizenID} getPeople={getPeople}/>:""
        }
        {
          people?<LocationPicker/>:""
        }
      </div>
      {/* /.col */}
      <div className="col-md-9">
      <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">Vinculos, relacionados y conocidos</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
        <div className="card-body">
        <div className="row">
            {ties?<ShowTies ties={ties} setPeople={setPeople} getTies={getTies}/>: <div className='loading' style={{height:"100px", marginBottom:"50px", margin: "auto"}}>
          <Cargando escala='1'/>
          </div>}
          </div>

        <div className="row">
      <div className='col-md-12'>
          {people?<AddTies aCitizenId={people?.citizenID} getTies={getTies} setTies={setTies}/>:""}
      </div>
      </div>
        
      </div>
      </div>
      <div className='row'>

        <div className="col-md-6">
        {
                people?.condition?<UpdateConditions condition={people?.condition} citizenID={people?.citizenID}/>:<NewConditions citizenID={people?.citizenID} getPeople={getPeople}/>
              }
      {/* 
        <div className="card card-warning collapsed-card">
            <div className="card-header">
              <h3 className="card-title">
              <i className='fas fa-hands-helping'/> Condición 
              </h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              hola
            </div>
          </div> */}

        <div className='card collapsed-card card-orange'>
        <div className="card-header">
        <h3 className="card-title"><i className="fas fa-chart-line"></i> Participacion</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      <div className='card-body'>
      {
        people?.Actividades.map((actividad) => 
        <ActivityCard key={actividad.id} actividad={actividad} getPeople={getPeople}/>
        )
        }
      </div>
      </div>



      </div>


      <div className="col-md-6">
      <div className='card collapsed-card card-lime'>
        <div className="card-header">
        <h3 className="card-title"><i className="fas fa-hand-holding-medical"></i> Beneficios</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      <div className='card-body'>
      {
        people?.Beneficios.map((beneficio) => 
          <BenefitCard key={beneficio.id} beneficio={beneficio} getPeople={getPeople}/>
        )
      }
      </div>
      </div>
        <div className='card collapsed-card card-maroon'>
        <div className="card-header">
        <h3 className="card-title"><i className="far fa-building"></i> Empleomania</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      <div className='card-body'>
      {
              people?.Empleos.map((empleo) => 
              <JobCard key={empleo.id} empleo={empleo} getPeople={getPeople}/>
              )
      } 
      </div>
      </div>


      </div>
      </div>
      {people?
              <NearbyCitizen citizenId={people?.citizenID} setPeople={setPeople}/>:""
              } 
      <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">GPS Location</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
        <div className="card-body">
        <GPS lat={people?.geolocation?.latitud} long={people?.geolocation?.longitud} peopleName={people?.firstName} picture={people?.picture}/>
        </div>
        </div>
      <div className="card">
          <div className="card-header p-1">
            <ul className="nav nav-pills">
              <li className="nav-item"><a className="nav-link" href="#editar" data-toggle="tab">Editar</a></li>
              <li className="nav-item"><a className="nav-link" href="#mapa" data-toggle="tab">Galeria</a></li>
            </ul>
          </div>{/* /.card-header */}
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane" id="editar">
              <CitizenForm/>
              </div>
              <div className='tab-pane' id="mapa">
              
              </div>
            </div>
          </div>
        </div>
</div>
    
      {/* /.col */}
    </div>
    :<div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='2'/>
    </div>
  }
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>

        </div>
        <Footer/>
    </div>
  )
}

export default People