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
          <h2 className="lead"><b>{people.firstName} {people.lastName}</b></h2>
          <p className="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
          <ul className="ml-4 mb-0 fa-ul text-muted">
            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> 
            Direccion:{people.adress}
            </li>
            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Phone #: + 800 - 12 12 23 52</li>
          </ul>
        </div>
        <div className="col-5 text-center">
          <img src="../../dist/img/user1-128x128.jpg" alt="user-avatar" className="img-circle img-fluid" />
        </div>
      </div>
    </div>
    <div className="card-footer">
      <div className="text-right">
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