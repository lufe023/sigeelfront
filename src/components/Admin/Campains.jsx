import React from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'

const Campains = () => {
  return (
    <>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Administrar Campañas</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Campañas</li>
            
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
  <div className="error-page">
    <h2 className="headline text-warning"> Prueba</h2>
    <div className="error-content">
      <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Esta vista no esta disponible en el modo prueba.</h3>
      <p>
        We could not find the page you were looking for.
        
      </p>
    </div>
    {/* /.error-content */}
  </div>
  {/* /.error-page */}
</section>

    </div>
    <Footer/>
    </>
  )
}

export default Campains