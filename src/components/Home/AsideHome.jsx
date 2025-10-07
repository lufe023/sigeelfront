import React from 'react'
import { Link } from 'react-router-dom'

const AsideHome = () => {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white" style={{marginLeft:0}}>
    <div className="container">
      <a className="navbar-brand">
        <img src="../../img/MIELECTOR-Isotipo-64x75.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Mi Elector</span>
      </a>
      <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse order-3" id="navbarCollapse">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          
          <li className="nav-item">
          <Link to='/' className="nav-link">
            Home
          </Link>
          </li>
          <li className="nav-item">
          <Link to='/dashboard' className="nav-link">
            Dashboard
          </Link>
          </li>
          
          {/* <li className="nav-item dropdown">
            <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Saber más</a>
            <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
              <li><a href="#" className="dropdown-item">Nosotros </a></li>
              <li><a href="#" className="dropdown-item">Unete</a></li>
              <li className="dropdown-divider" />
             
              <li className="dropdown-submenu dropdown-hover">
                <a id="dropdownSubMenu2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Hover for action</a>
                <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                  <li>
                    <a tabIndex={-1} href="#" className="dropdown-item">level 2</a>
                  </li>
                  
                  <li className="dropdown-submenu">
                    <a id="dropdownSubMenu3" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">level 2</a>
                    <ul aria-labelledby="dropdownSubMenu3" className="dropdown-menu border-0 shadow">
                      <li><a href="#" className="dropdown-item">3rd level</a></li>
                      <li><a href="#" className="dropdown-item">3rd level</a></li>
                    </ul>
                  </li>
                 
                  <li><a href="#" className="dropdown-item">level 2</a></li>
                  <li><a href="#" className="dropdown-item">level 2</a></li>
                </ul>
              </li>
              
            </ul>
          </li> */}
        </ul>
      </div>
      {/* Right navbar links */}
   
    </div>
  </nav>
  )
}

export default AsideHome