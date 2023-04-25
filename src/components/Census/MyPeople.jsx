import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import PeopleCardB from './PeopleCardB'
import Cargando from '../../utils/Cargando'
import GPSGeneralView from './GPSGeneralView'
import { Link } from 'react-router-dom'

const MyPeople = () => {

    const [results, setResults] = useState()
    const [isLoading, setIsloading] = useState(true)
    const getMypeople = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/mypeople`
            axios.get(URL,
            getConfig()
            )
            .then(res => {
                setResults(res.data.rows)
                setIsloading(false)
                
        })
        .catch(err =>{
            setResults([])
            setIsloading(false)
            console.log(err)
        })
        }

        useEffect(() => {

        getMypeople()
        }, [])
    return (
    <div>
        <Header/>
        <Aside/>
        <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Mi Gente</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to='/dashboard'>Dashboard</Link></li>
            <li className="breadcrumb-item active">Mi Gente</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  {
  isLoading?
  <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='1.5'/>
    </div>
    :""
  }
  <section className="content">
    {/* Default box */}
    
      
        <div className="row">
        
            {
        results?.map((result) => 
          <PeopleCardB key={result.id} people={result} getMypeople={getMypeople}/>
          )
        }
      
   {/* /.card */}
    </div>


      {/*vista de mapa*/}  
      <div className="row">
  <div className="col-md-12">
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Donde está mi gente</h5>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <div className="btn-group">
            <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
              <i className="fas fa-wrench" />
            </button>
            <div className="dropdown-menu dropdown-menu-right" role="menu">
              <a href="#" className="dropdown-item">Action</a>
              <a href="#" className="dropdown-item">Another action</a>
              <a href="#" className="dropdown-item">Something else here</a>
              <a className="dropdown-divider" />
              <a href="#" className="dropdown-item">Separated link</a>
            </div>
          </div>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body">
        <div className="row">
        <div className="col-md-12">
          {
        results?
        <GPSGeneralView peoples={results}/>
       :"" 
        }
        </div>
          
        </div>
        {/* /.row */}
      </div>

      {/* /.card-footer */}
    </div>
    {/* /.card */}
  </div>
  {/* /.col */}
</div>

  </section>

</div>
        <Footer/>
    </div>
  )
}

export default MyPeople
