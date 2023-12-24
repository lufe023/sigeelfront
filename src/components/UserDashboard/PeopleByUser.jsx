import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import PeopleCard from '../Census/PeopleCard'
import { Link, useParams } from 'react-router-dom'
import GPSGeneralView from '../Census/GPSGeneralView'
import Swal from 'sweetalert2'
import Content from '../Content'
import CollaboratorDashboard from './CollaboratorDashboard.jsx'
import FindAndAddPeople from '../Census/FindAndAddPeople'

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
              setConsultedUser(res.data.user)
              setResults(res.data.rows)
        })
        .catch(err =>{
            setResults([])
            console.log(err)

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: `Accion no permitida: ${err.response.statusText}`
            })
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
  <section className="content-header bg-dark"  style={{position:'sticky', top:'0px', zIndex:'1', backgroundColor:'#f8f9fa', boxShadow:'0px 1px 1px rgba(0, 0, 0, 0.19)', marginBottom:'20px' }}>
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Padroncillo de: <span style={{fontWeight  :"100", margin:"5px"}}>{counsultedUser?.censu.firstName} </span></h1>
          {counsultedUser?.censu?.nickname} <b>{counsultedUser?.user_role.roleName}</b>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to='/users' >Colaboradores</Link></li>
            <li className="breadcrumb-item active">Gente de Otro Usuario</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content" >
  <FindAndAddPeople getMypeople={getMypeople} leaderId={id}/>
        <div className="row">

            
          {
            results?.map((result) => 
              <PeopleCard key={result.id} people={result} getMypeople={getMypeople}/>
              )
            }
      

    </div> 

  <div className="row">
  <div className="col-md-12">
    <div className="card collapsed-card">
      <div className="card-header">
        <h5 className="card-title">Donde está la gente</h5>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-plus" />
          </button>
          <div className="btn-group">
            <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
              <i className="fas fa-wrench" />
            </button>
            <div className="dropdown-menu dropdown-menu-right" role="menu">
              <a href="#" className="dropdown-item">Accion</a>
              <a href="#" className="dropdown-item">Otra accion</a>
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
<CollaboratorDashboard UserId={id} UserName={counsultedUser?.censu.firstName}/>
        <Footer/>
    </div>
  )
}

export default PeopleByUser