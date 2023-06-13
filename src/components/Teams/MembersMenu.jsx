import React from 'react'
import { Link } from 'react-router-dom'

const MembersMenu = ({member}) => {
  return (
    <>
    
    <li className="nav-item dropdown user-menu">
  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${member.memberData.censu.picture}`} className="user-image img-circle elevation-2" alt="User Image" />
    <span className="d-none d-md-inline">{member.memberData.censu.firstName}</span>
  </a>

  
  <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: 'inherit', right: 0}}>
  <div className="card card-widget widget-user shadow">
    {/* Add the bg color to the header using any of the bg-* classes */}
    <div className="widget-user-header bg-info">
      <h3 className="widget-user-username">{member.memberData.censu.firstName}</h3>
      <h5 className="widget-user-desc">{member.memberData.user_role.roleName}   {member.teamLeader?" - Team Leader": ''}</h5>
    </div>
    <div className="widget-user-image">
      <img className="img-circle elevation-2" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${member.memberData.censu.picture}`} alt="User Avatar" />
    </div>
    <div className="card-footer">
      <div className="row">
        <div className="col-sm-6 border-right">
          <div className="description-block">
            <h5 className="description-header">Correo</h5>
            <span style={{fontSize:"12px"}}><a href={`mailto:${member.memberData.email}`}>{member.memberData.email}</a></span>
          </div>
          {/* /.description-block */}
        </div>
        {/* /.col */}

        {/* /.col */}
        <div className="col-sm-6">
          <div className="description-block">
            <h5 className="description-header">Telefono</h5>
            <span  style={{fontSize:"12px"}}><a href={`tel:${member.memberData.censu.celphone}`}>{member.memberData.censu.celphone}</a></span>
          </div>
          {/* /.description-block */}
        </div>
        {/* /.col */}
      </div>

        <div className="row">
            <div className="col-sm-6 ">
            <div className="description-block">
            <Link  className="btn btn-default btn-flat">Perfil</Link>
            </div>
            </div>
            <div className="col-sm-6">
          <div className="description-block">
          <Link to={`/peoplebyuser/${member.memberId}`} className="btn btn-default btn-flat ">Seguimiento</Link>
            </div>
            </div>
        </div>
    </div>
  </div>
 
  </ul>
    </li>

    </>
  )
}

export default MembersMenu



