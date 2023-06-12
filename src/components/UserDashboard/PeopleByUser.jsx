import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import PeopleCardB from '../Census/PeopleCardB'
import { useParams } from 'react-router-dom'
import GPSGeneralView from '../Census/GPSGeneralView'

const PeopleByUser = () => {
    const [results, setResults] = useState()
  const [counsultedUser, setConsultedUser] = useState()
    const {id} = useParams()

const data = {
    leaderId:id
}
    const getMypeople = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/peoplebyuser/`
            axios.post(URL,
                data,
            getConfig()
            )
            .then(res => {
              setConsultedUser(res.data[1])
                setResults(res.data[0].rows)
        })
        .catch(err =>{
            setResults([])
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
  <section className="content-header"  style={{position:'sticky', top:'0px', zIndex:'1', backgroundColor:'#f8f9fa', boxShadow:'0px 1px 1px rgba(0, 0, 0, 0.19)', marginBottom:'20px' }}>
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Padroncillo de: <span style={{fontWeight  :"100", margin:"5px"}}>{counsultedUser?.censu.firstName} </span></h1>
          {counsultedUser?.censu?.nickname} <b>{counsultedUser?.user_role.roleName}</b>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Mi Gente</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content" >
    {/* Default box */}
    
      
        <div className="row">
        
            {
        results?.map((result) => 
        
          <PeopleCardB key={result.id} people={result} getMypeople={getMypeople}/>
          )
        }
      
   {/* /.card */}
    </div>

  <div className="row">
  <div className="col-md-12">
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Donde está la gente</h5>
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

export default PeopleByUser