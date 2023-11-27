import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink, useParams} from 'react-router-dom'
import getConfig from '../utils/getConfig'
import { setUserData } from '../store/slices/user.slice'
import ScroolTop from './Miscelaneos/ScroolTop'


const Aside = () => {
  
const [user, setUser] = useState(useSelector(state=> state.userSlice))

  const dispatch = useDispatch()



  const getUserbyId = () => { 
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/me`
      axios.get(URL, getConfig())
      .then(res => {
        dispatch(setUserData(res.data))
        setUser(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
  getUserbyId()
  }, [])

  if(user?.censu?.firstName=="Cargando"){
    getUserbyId()
  }

  
  const first_name = user?.censu?.firstName 
  
  const last_name =  user?.censu?.lastName
  
  const picture = user?.censu?.picture

  return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  <ScroolTop/>
  {/* Brand Logo */}
  <Link to="/" className="brand-link">
    <img src="img/MIELECTOR-Isotipo-64x75.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Mi Elector</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
      <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${picture}`} className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
      <NavLink to={`/mypeople/${user?.censu?.id}`} className="d-block">{`${first_name} ${last_name}`}</NavLink>
      </div>
    </div>

    {/* Sidebar Menu */}
    <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li  className={'nav-item menu-is-openig menu-open'}>
                <NavLink  className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Panel Principal
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item" >
                  <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to='/dashboard'>
                      <i className="fas fa-calendar-check nav-icon"></i>
                      <p>Panel</p>
                  </NavLink>
                  </li>
                  <li className="nav-item">
                    
                  <NavLink to={`/mypeople/${user?.censu?.id}`} className="nav-link ">
                      <i className="fas fa-user-alt nav-icon"></i>
                      <p>Perfil</p>
                  </NavLink>
                  </li>

                  <li className="nav-item">
                  <NavLink to='/mypeople' className="nav-link ">
                      <i className="fas fa-id-card  nav-icon"></i>
                      <p>Padroncillo</p>
                  </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink to='/delegate' className="nav-link ">
                  <i className="fas fa-hotel nav-icon" />
                      <p> Colegios</p>
                  </NavLink>
                  </li>
                  
                  <li className="nav-item">
                  <NavLink to='/tasks' className="nav-link ">
                      <i className="fas fa-tasks  nav-icon"></i>
                      <p>Tareas</p>
                  </NavLink>
                  </li>
                  

                  <li className="nav-item">
                  <NavLink to="/teams" className="nav-link">
                  <i className="fas fa-sitemap"/>
                      <p> Teams</p>
                  </NavLink>
                  </li>
                  <li className='nav-item'>
                  </li>
                </ul>
              </li>
            </ul>
          
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li  className='nav-item menu-open'>
                <NavLink  className='nav-link'>
                <i className="fas fa-lock"/> 
                  <p> Administración<i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <NavLink to="/users" className="nav-link">
                      <i className="fas fa-users nav-icon" />
                      <p>Colaboradores</p>
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink to="/delegate" className="nav-link">
                    <i className="fas fa-user-tag" />
                      <p> Delegados</p>
                    </NavLink>
                  </li> */}
                <li className='nav-item'>
                  <NavLink to="/ballot" className="nav-link">
                      <i className="fas fa-book-open nav-icon" />
                      <p>Boleta</p>
                  </NavLink>
                  </li>
                  <li className="nav-item" >
                  <NavLink to="/admin" className="nav-link">
                  <i className="fas fa-person-booth"></i>
                      <p> Registros</p>
                  </NavLink>
                  </li>
                  <li className="nav-item" >
                  <NavLink to="/campains" className="nav-link">
                  <i className="fas fa-puzzle-piece"></i>
                      <p> Campañas</p>
                  </NavLink>
                  </li>
                  <li className="nav-item" >
                  <NavLink to="/informs" className="nav-link">
                  <i className="fas fa-chart-bar"></i>
                      <p> Informes</p>
                  </NavLink>
                  </li>
                  </ul>
                  </li>
                  </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>


  )
}

export default Aside