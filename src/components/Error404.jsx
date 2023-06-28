import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div>
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
         
        </div>
        <div className="col-sm-6">
          
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="error-page">
      <h2 className="headline text-warning"> 404</h2>
      <div className="error-content">
        <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! No he podido encontrar esta pagina.</h3>
        <p>
          quizas estes perdido
          regresa al inicio <Link to="/">Regresar</Link>.
        </p>
        <form className="search-form">
          <div className="input-group">
            <input type="text" name="search" className="form-control" placeholder="Search" />
            <div className="input-group-append">
              <button type="submit" name="submit" className="btn btn-warning"><i className="fas fa-search" />
              </button>
            </div>
          </div>
          {/* /.input-group */}
        </form>
      </div>
      {/* /.error-content */}
    </div>
    {/* /.error-page */}
  </section>
  {/* /.content */}
</div>

  )
}

export default Error404