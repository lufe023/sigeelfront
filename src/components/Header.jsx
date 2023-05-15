import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, NavLink } from 'react-router-dom'
import SearhPeople from './SearhPeople'

const Header = () => {
  const user = useSelector(state=> state.userSlice)

  const first_name = user?.censu?.firstName
  
  const last_name =  user?.censu?.lastName
  
  const picture = user?.censu?.picture
  return (
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
    <Link className="nav-link" href="#" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></Link>
    </li>
    <li className="nav-item">
          <NavLink to='/' className="nav-link">
            Home
          </NavLink>
          </li>
          <li className="nav-item">
          <Link to='/dashboard' className="nav-link">
            Dashboard
          </Link>
          </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    <SearhPeople/>
    {/* Messages Dropdown Menu */}
 
    {/* Notifications Dropdown Menu */}
    <li className="nav-item dropdown">
      <Link className="nav-link" data-toggle="dropdown" href="#">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">15</span>
      </Link>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">15 Notifications</span>
        <div className="dropdown-divider" />
        <Link href="#" className="dropdown-item">
          <i className="fas fa-envelope mr-2" /> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </Link>
        <div className="dropdown-divider" />
        <Link href="#" className="dropdown-item">
          <i className="fas fa-users mr-2" /> 8 friend requests
          <span className="float-right text-muted text-sm">12 hours</span>
        </Link>
        <div className="dropdown-divider" />
        <Link href="#" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </Link>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div>
    </li>
    <li className="nav-item dropdown user-menu">
  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
    <img src="../../dist/img/user2-160x160.jpg" className="user-image img-circle elevation-2" alt="User Image" />
    <span className="d-none d-md-inline">{first_name} {last_name}</span>
  </a>
  <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    {/* User image */}
    <li className="user-header bg-primary">
      <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      <p>
      {first_name} {last_name}
        <small>{user?.nivel?.roleName}</small>
      </p>
    </li>
    {/* Menu Body */}
    
    {/* Menu Footer*/}
    <li className="user-footer">
      <a href="#" className="btn btn-default btn-flat">Profile</a>
      <Link to='/logout' className="btn btn-default btn-flat float-right">Cerrar Session</Link>
      
    </li>
  </ul>
</li>
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li>
  </ul>
</nav>


  )
}

export default Header