import React from 'react'

const PeopleCard = ({people}) => {

  return (
    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
    <div className="card bg-light d-flex flex-fill">
    <div className="card-header text-muted border-bottom-0">
      {people.citizenID}
    </div>
    <div className="card-body pt-0">
      <div className="row">
        <div className="col-7">
          <h2 className="lead"><b>{people.firstName} {people.lastName} </b>{people.nickname?`(${people.nickname})`:" "}</h2>
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
          <img src="../../dist/img/user1-128x128.jpg" alt="user-avatar" className="img-circle img-fluid" />
        </div>
      </div>
    </div>
    <div className="card-footer">
      <div className="text-right" style={{display:'flex', justifyContent:'space-evenly'}}>
        {
            people.geolocation?
      <a href={`https://www.google.com/maps/search/${people.geolocation.latitud},+${people.geolocation.longitud}?shorturl=1`} className="btn btn-sm btn-info" target={'_blank'}>
      <i className="fas fa-location-arrow"></i>
      </a>
      :''
}
        <a href="#" className="btn btn-sm bg-teal">
          <i className="fas fa-comments" />
        </a>
        <a href="#" className="btn btn-sm btn-primary">
          <i className="fas fa-user" /> View Profile
        </a>
      </div>
    </div>
  </div>
  </div>
  )
}

export default PeopleCard