import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import FormPoll from './FormPoll'


const PollsForm = () => {

    const [poll, setPoll] = useState()
    const [loading, setLoading] = useState(true)
    const [candidates, setCandidates] = useState()
    const {id} = useParams()

    const getPoll = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/polls/${id}`
        axios.get(URL, getConfig())
        .then(res => {
            setPoll(res.data.poll[0])
            setCandidates(res.data.poll[1].availablesCandidates.rows)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getPoll()
    }, [id])

    const handleSubmit = e =>{
      e.preventDefault()
      console.log(e.target.preferedParty.value)
    }


if(loading){
return(
<>
    <Header/>
    <Aside/>
  <div className="content-wrapper">
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"50vh"}}>
  <Cargando escala="3"/>
    </div>
</div>
  </>
    )
}
    else{
    return (
    <>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
    <section className="content-header">
    
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Encuesta del Ciudadano</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><Link to='/mypeople' >My People</Link></li>
          <li className="breadcrumb-item active">Perfil del  Ciudadano</li>
        </ol>
      </div>
    </div>
  </div>
</section>
<section className="content-header">
    <div className='row'>
    <div className="col-md-12">
  {/* Widget: user widget style 2 */}
  <div className="card card-widget widget-user-2">
    {/* Add the bg color to the header using any of the bg-* classes */}
    <div className="widget-user-header bg-info">
      <div className="widget-user-image">
        <img className="img-circle elevation-2"
            src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${poll?.citizen?.picture}`}
            alt="Imagen del Ciudadano" />
      </div>
      {/* /.widget-user-image */}
        <h3 className="widget-user-username">{poll?.citizen?.firstName}</h3>
        <h5 className="widget-user-desc">
        {`${poll?.citizen?.citizenID.substring(0,3)}-${poll?.citizen?.citizenID.substring(3,10)}-${poll?.citizen?.citizenID.substring(10,11)}`}
        </h5>
    </div>
  </div>
  {/* /.widget-user */}
</div>

    </div>

<div className="card card-warning">
  <div className="card-header">
    <h3 className="card-title">{poll?.Campain?.name}</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  <form onSubmit={handleSubmit}>
    <div className="card-body">
    <FormPoll candidates={candidates}/>
    </div>
  </form> 
</div>
    </section>
    </div>
    
    <Footer/>
    </>
  )
}
}


export default PollsForm