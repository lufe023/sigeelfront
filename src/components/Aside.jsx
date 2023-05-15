import React from 'react'
import { useSelector } from 'react-redux'
import {Link, NavLink, useParams} from 'react-router-dom'



const Aside = () => {

  const user = useSelector(state=> state.userSlice)
  
  const first_name = user?.censu?.firstName 
  
  const last_name =  user?.censu?.lastName
  
  const picture = user?.censu?.picture

  return (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">

  {/* Brand Logo */}
  <Link to="/" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">SIGEEL</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition"><div className="os-resize-observer-host observed"><div className="os-resize-observer" style={{left: 0, right: 'auto'}} /></div><div className="os-size-auto-observer observed" style={{height: 'calc(100% + 1px)', float: 'left'}}><div className="os-resize-observer" /></div><div className="os-content-glue" style={{margin: '0px -8px'}} /><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" style={{overflowY: 'scroll'}}><div className="os-content" style={{padding: '0px 8px', height: '100%', width: '100%'}}>
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <NavLink to='/me' className="d-block">
              {`${first_name} ${last_name}`}
              </NavLink>
            </div>
          </div>
          {/* SidebarSearch Form */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <Link  className={'nav-item menu-is-openig menu-open'}>
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
                  <NavLink to='/me' className="nav-link ">
                      <i className="fas fa-user-alt nav-icon"></i>
                      <p>Perfil</p>
                  </NavLink>
                  </li>

                  <li className="nav-item">
                  <NavLink to='/mypeople' className="nav-link ">
                      <i className="fas fa-id-card  nav-icon"></i>
                      <p>Mi Gente</p>
                  </NavLink>
                  </li>
                  
                  <li className="nav-item">
                  <NavLink to='/tasks' className="nav-link ">
                      <i className="fas fa-tasks  nav-icon"></i>
                      <p>Tareas</p>
                  </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/users" className="nav-link">
                      <i className="fas fa-users nav-icon" />
                      <p>Colaboradores</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink to="/ballot" className="nav-link">
                      <i className="fas fa-book-open nav-icon" />
                      <p>Boleta</p>
                  </NavLink>
                  </li>
                </ul>
              </Link>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{width: '100%', transform: 'translate(0px, 0px)'}} /></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{height: '44.8859%', transform: 'translate(0px, 0px)'}} /></div></div><div className="os-scrollbar-corner" /></div>
  {/* /.sidebar */}
</aside>

  )
}

export default Aside