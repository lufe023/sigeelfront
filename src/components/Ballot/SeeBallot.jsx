import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import Swal from 'sweetalert2'
import NewCandidate from './NewCandidate'
import Cargando from '../../utils/Cargando'

const SeeBallot = () => {
    const [candidates, setCandidates] = useState()

  const getAllUsers = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots`
      axios.get(URL, getConfig())
      .then(res => {
        setCandidates(res.data.rows)
      })
      .catch(err =>{
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
  getAllUsers()
  }, [])

  return (
<div>
<Header/>
<Aside/>    
<div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Boleta</h1>
        </div>
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active">Boleta</li>
            </ol>
            </div>
      </div>
    </div>
  </section>
  <section className="content">
  <div className="row">
    <div className="col-12">
  <div className="card">
  <div className="card-header">
    <h3 className="card-title">Candidatos</h3>
    <div className="card-tools">
      <div className="input-group input-group-sm" style={{width: 150}}>
        <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-default">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body table-responsive p-0">
  
    <table className="table table-head-fixed text-nowrap">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Partido</th>
          <th>Acronimo</th>
          <th>Candidatura</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
        candidates?
        candidates?.map((candidate) => 
          <tr key={candidate.id}>
            <td>
          <img className="img-circle img-bordered-sm" src="dist/img/user7-128x128.jpg" alt="user image" style={{height:'40px'}} />

            </td>
            <td>{candidate.name} </td>
            <td>{candidate.party} </td>
            <td>{candidate.partyAcronym} </td>
            <td>{candidate.nomination} </td>
            <td>
            <div className="btn-group">
  <button type="button" className="btn btn-default">Acciones</button>
  <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
    <span className="sr-only">Toggle Dropdown</span>
  </button>
  <div className="dropdown-menu" role="menu" style={{}}>
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
    <div className="dropdown-divider" />
    <a className="dropdown-item" href="#">Separated link</a>
  </div>
</div>
</td>
</tr>
)
:<div className='loading' style={{height:"100px", marginBottom:"50px"}}><Cargando scala="3"/></div>
}
      <tr>
        <td colSpan={6}>
          <NewCandidate getAllUsers={getAllUsers()}/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  {/* /.card-body */}
</div>



    </div>

  </div>
    
  </section>
        </div>
        <Footer/>
    </div>
  )
}

export default SeeBallot