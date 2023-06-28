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
          {/* /.card-body */}
        </div>
        {/* /.card */}
        {/* About Me Box */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">About Me</h3>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <strong><i className="fas fa-book mr-1" /> Education</strong>
            <p className="text-muted">
              B.S. in Computer Science from the University of Tennessee at Knoxville
            </p>
            <hr />
            <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
            <p className="text-muted">Malibu, California</p>
            <hr />
            <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
            <p className="text-muted">
              <span className="tag tag-danger">UI Design</span>
              <span className="tag tag-success">Coding</span>
              <span className="tag tag-info">Javascript</span>
              <span className="tag tag-warning">PHP</span>
              <span className="tag tag-primary">Node.js</span>
            </p>
            <hr />
            <strong><i className="far fa-file-alt mr-1" /> Notes</strong>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.col */}
      <div className="col-md-9">
        <div className="card">
          <div className="card-header p-2">
            <ul className="nav nav-pills">
              <li className="nav-item"><a className="nav-link active" href="#details" data-toggle="tab">Detalles</a></li>
              <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
              <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Editar</a></li>
              <li className="nav-item"><a className="nav-link" href="#mapa" data-toggle="tab">Geolocalización</a></li>
            </ul>
          </div>{/* /.card-header */}
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane active" id="details">
                {/* Empleomania */ }
                <div className="timeline timeline-inverse">
                  {/* timeline time label */}
                  <div className="time-label">
                    <span className="">
                      Empleomania
                    </span>
                  </div>
                  {
                  people?.Empleos.map((empleo) => 
                  <div key={empleo.id}>
                    <i className="fas fa-briefcase bg-primary" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> {empleo.startedAt}</span>
                      <h3 className="timeline-header"><a href="#">{empleo.position}</a> en {empleo.institution}</h3>
                      <div className="timeline-body">
                      
                      {empleo.positionDetails}
                      </div>
                      <p style={{margin:"10px"}}>
                    <a href="#" className=" text-sm mr-2"><i className="fas fa-edit"></i> Editar</a>
                    <a href="#" className=" text-sm"><i className="fas fa-trash-alt"></i> Eliminar</a>
                  </p>
                      
                    </div>
                  </div>
                  )
                  }
                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div>    
                {/* Beneficios*/}
                <div className="timeline timeline-inverse">
                  {/* timeline time label */}
                  <div className="time-label">
                    <span className="">
                    Beneficios
                    </span>
                  </div>
                  {
                  people?.Beneficios.map((beneficio) => 
                  <div key={beneficio.id}>
                    <i className="fas fa-hand-holding-medical bg-success" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> {beneficio.receiveAt}</span>
                      <h3 className="timeline-header"><a href="#">Beneficio</a></h3>
                      <div className="timeline-body">
                      
                      {beneficio.benefitDescription}
                      </div>
                      <p style={{margin:"10px"}}>
                    <a href="#" className=" text-sm mr-2"><i className="fas fa-edit"></i> Editar</a>
                    <a href="#" className=" text-sm"><i className="fas fa-trash-alt"></i> Eliminar</a>
                  </p>
                      
                    </div>
                  </div>
                  )
                  }
                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div> 

                <div className="timeline timeline-inverse">
                  {/* timeline time label */}
                  <div className="time-label">
                    <span className="">
                    Actividades
                    </span>
                  </div>
                  {
                  people?.Actividades.map((actividad) => 
                  <div key={actividad.id}>
                    
                    <i className="fas fa-people-arrows bg-info" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> {actividad.receiveAt}</span>
                      <h3 className="timeline-header"><a href="#">Actividad</a></h3>
                      <div className="timeline-body">
                      
                      {actividad.activityDescription}
                      </div>
                      <p style={{margin:"10px"}}>
                    <a href="#" className=" text-sm mr-2"><i className="fas fa-edit"></i> Editar</a>
                    <a href="#" className=" text-sm"><i className="fas fa-trash-alt"></i> Eliminar</a>
                  </p>
                      
                    </div>
                  </div>
                  )
                  }
                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div>  
              </div>
              {/* /.tab-pane */}
              <div className="tab-pane" id="timeline">
                {/* Beneficios */}
                <div className="timeline timeline-inverse">
                  {/* timeline time label */}
                  <div className="time-label">
                    <span className="bg-danger">
                      10 Feb. 2014
                    </span>
                  </div>
                  {/* /.timeline-label */}
                  {/* timeline item */}
                  <div>
                    <i className="fas fa-envelope bg-primary" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 12:05</span>
                      <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>
                      <div className="timeline-body">
                        Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                        weebly ning heekya handango imeem plugg dopplr jibjab, movity
                        jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                        quora plaxo ideeli hulu weebly balihoo...
                      </div>
                      <div className="timeline-footer">
                        <a href="#" className="btn btn-primary btn-sm">Read more</a>
                        <a href="#" className="btn btn-danger btn-sm">Delete</a>
                      </div>
                    </div>
                  </div>
                  {/* END timeline item */}
                  {/* timeline item */}
                  <div>
                    <i className="fas fa-user bg-info" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 5 mins ago</span>
                      <h3 className="timeline-header border-0"><a href="#">Sarah Young</a> accepted your friend request
                      </h3>
                    </div>
                  </div>
                  {/* END timeline item */}
                  {/* timeline item */}
                  <div>
                    <i className="fas fa-comments bg-warning" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 27 mins ago</span>
                      <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                      <div className="timeline-body">
                        Take me to your leader!
                        Switzerland is small and neutral!
                        We are more like Germany, ambitious and misunderstood!
                      </div>
                      <div className="timeline-footer">
                        <a href="#" className="btn btn-warning btn-flat btn-sm">View comment</a>
                      </div>
                    </div>
                  </div>
                  {/* END timeline item */}
                  {/* timeline time label */}
                  <div className="time-label">
                    <span className="bg-success">
                      3 Jan. 2014
                    </span>
                  </div>
                  {/* /.timeline-label */}
                  {/* timeline item */}
                  <div>
                    <i className="fas fa-camera bg-purple" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 2 days ago</span>
                      <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>
                      <div className="timeline-body">
                        <img src="https://placehold.it/150x100" alt="..." />
                        <img src="https://placehold.it/150x100" alt="..." />
                        <img src="https://placehold.it/150x100" alt="..." />
                        <img src="https://placehold.it/150x100" alt="..." />
                      </div>
                    </div>
                  </div>
                  {/* END timeline item */}
                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div>
              </div>
              {/* /.tab-pane */}
              <div className="tab-pane" id="settings">
              <CitizenForm/>
              </div>
              <div className='tab-pane' id="mapa">
              <GPS lat={people?.geolocation?.latitud} long={people?.geolocation?.longitud} peopleName={people?.firstName} picture={people?.picture}/>
              </div>
            </div>
          </div>
        </div>

  <div className="card card-default">
  <div className="card-header">
    <h3 className="card-title">Vinculos, relacionados y conocidos</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body">
  <div className="row">
      {ties?<ShowTies ties={ties} setPeople={setPeople}/>: <div className='loading' style={{height:"100px", marginBottom:"50px", margin: "auto"}}>
    <Cargando escala='1'/>
    </div>}
    </div>

  <div className="row">
<div className='col-md-12'>
    {people?<AddTies aCitizenId={people?.citizenID} getTies={getTies} setTies={setTies}/>:""}
</div>
</div>
  
</div>
</div></div>
    
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