import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import "./PeopleCard.css"
import Jobs from './Contact/Jobs'
import UpdateConditions from './Contact/UpdateConditions'
import LocationPicker from './Contact/LocationPicker'
import ParticipationForm from './Contact/Participation'
import BenefitForm from './Contact/BenefitForm '
import NewConditions from './Contact/NewCondition'
const PeopleCard = ({people, getMypeople}) => {

  const user = useSelector(state=> state.userSlice)

  const deletePeople = (peopleId, peopleName) => {
  Swal.fire({
    title: `¿Seguro quieres eliminar a <p>${peopleName}</p> de tu padrón personal?`,
    text: `Esta acción hará que ${peopleName} quede disponible para otro lider`,
    icon: 'info',
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Quitalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado',
        'Accion realizada con éxito',
        'success'
      )
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/removepeople`
      axios.post(URL,
          {
            peopleId:peopleId,
            leaderId: user.id
          },
      getConfig(),
      )
      .then(res => {
        getMypeople()         
  })
  .catch(err =>{
      console.log(err)
  })
    }
  })

}


  return (
  <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
  <div className="card">
    <div className="card-header p-2">
      <ul className="nav nav-pills">
      <li className="nav-item"><a className="nav-link active" href={`#presentacion${people.id}`} data-toggle="tab">Presentacion</a></li>
      <li className="nav-item"><a className="nav-link" href={`#settings${people.id}`} data-toggle="tab">Acciones</a></li>
      <li className="nav-item"><a className="nav-link" href={`#encuestar${people.id}`} data-toggle="tab">En contacto</a></li>
      </ul>
    </div>{/* /.card-header */}
    <div className="card-body">
      <div className="tab-content">
        <div className="tab-pane active" id={`presentacion${people.id}`}>

      <div className="row">
        <div className="col-7">
        <Link to={`/mypeople/${people.id}`}>
          <h2 className="lead"><b>{people.firstName} {people.lastName} </b>{people.nickname?`(${people.nickname})`:" "}</h2>
        </Link>
        <span>
        {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`}
        </span>
          <hr/>
          <ul className="ml-4 mb-0 fa-ul text-muted">
            <li className="small"><span className="fa-li">
            <i className="fas fa-lg fa-building" /></span> 
            Direccion: {people.adress}
            </li>
            {
                people.neighbourhoods?
                <li className="small"><span className="fa-li">
                <i className="fas fa-map-marker"></i></span> 
                Vecindario:{people.neighbourhoods.name}
                </li>
                :''
            }
            {
              people.districts?
              <li className="small"><span className="fa-li">
              <i className="far fa-map"></i></span> 
              Distrito:{people.districts.name}
              </li>
              :''
            }

            <li className="small"><span className="fa-li">
            <i className="fas fa-map"></i></span> 
            Municipio:{people.municipalities.name}
            </li>

            <li className="small"><span className="fa-li">
            <i className="fas fa-map-marked"></i></span> 
            Provincia:{people.provinces.name}
            </li>

            <li className="small">
                <span className="fa-li">
                <i className="fas fa-lg fa-phone" />
                </span>
                Celular: <a href={`tel:${people.celphone}`}>{people.celphone}</a>
            </li>
            <li className="small">
                <span className="fa-li">
                <i className="fas fa-lg fa-phone" />
                </span>
                Telefono: <a href={`tel:${people.telephone}`}>{people.telephone}</a>
            </li>
            <li className="small">
                <span className="fa-li">
                <i className="fas fa-lg fa-phone" />
                </span>
                Otro Telefono: {people.otherPhone}
            </li>

          </ul>
        </div>
        <div className="col-5 text-center">
          <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="user-avatar" className="img-circle img-fluid" />
        </div>
      </div>
      </div>
        
        <div className="tab-pane" id={`settings${people.id}`}>
          <div className='row'>
        <div className="col-7">
        
          <h2 className="lead"><b>{people.firstName} {people.lastName} </b>{people.nickname?`(${people.nickname})`:" "}</h2>
          
          </div>
          </div>
          <hr/>
          

        <Link to={`/mypeople/${people.id}`} className="btn btn-app">
        <i className="fas fa-user" /> Ver Perfil
        </Link>
        <a className="btn btn-app">
        <i className="fas fa-user-edit"></i> Editar
        </a>
        <a className="btn btn-app" onClick={()=>deletePeople(people.id, people.firstName)}>
        <i className="fas fa-user-minus"></i> Quitar
        </a>

      {
      people.geolocation?
      <a href={`https://www.google.com/maps/search/${people.geolocation.latitud},+${people.geolocation.longitud}?shorturl=1`} 
      className="btn btn-app" target={'_blank'}>
      <i className="fas fa-location-arrow"></i>
      Localizar
      </a>
      :''
      }
      
      <a href={`https://api.whatsapp.com/send?phone=${people.celphone.substring(1,people.celphone.length).split('-').join('')}&text=Hola ${people.firstName} ¿Qué tal?`} className="btn btn-app" target={'_blank'}>
      <i className="fab fa-whatsapp"></i> Whatsapp
        </a>{people.celphone.split('-')}
        
      <a href={`https://t.me/${people.celphone}`} className="btn btn-app" target={'_blank'}>
      <i className="fab fa-telegram-plane"></i> Telegram
      </a>

      </div>

        <div className="tab-pane" id={`encuestar${people.id}`}>
          <div className='row'></div>
          <div className="col-7">
        
        <h2 className="lead"><b>{people.firstName} {people.lastName} </b>{people.nickname?`(${people.nickname})`:" "}</h2>
        </div>
        
        <hr/>
        {
          people?.Encuestas?.map((result) => 
            <li key={result.id}>
            <div className="info-box">
              <span className="info-box-icon bg-info"><i className="fas fa-poll"/></span>
              <div className="info-box-content">
                <span className="info-box-text">{result.Campain.name}</span>
                <span className="info-box-number">Finaliza: <small>{result.Campain.finishAt.substring(0,10)}</small></span>
                <Link to={`/people/poll/${result.id}/${people.firstName} ${people.lastName}`} className='btn btn-block btn-default'>Completar</Link>
            </div>
            </div>
            </li>
            )}
{
  people.condition?<UpdateConditions condition={people.condition} citizenID={people?.citizenID} key={people?.citizenID.citizenID}/>: <NewConditions citizenID={people?.citizenID}  key={people?.citizenID.citizenID}/>
   /* <NewConditions/> */
}
  
  <ParticipationForm citizenID={people?.citizenID} getPeople={getMypeople}/>
  <BenefitForm citizenID={people?.citizenID} getPeople={getMypeople} />
  <Jobs citizenID={people?.citizenID} getPeople={getMypeople}/>
  <LocationPicker/>

  </div>
  </div>
      
    </div>
    <div className="card-footer">
      
    </div>
  </div>
  
</div>

  )
}

export default PeopleCard