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

    const presidentes = candidates?.filter((filtro)=> filtro.nomination == "Presidente")
    const senadores = candidates?.filter((filtro)=> filtro.nomination == "Senador/a")
    const diputados = candidates?.filter((filtro)=> filtro.nomination == "Diputado/a")
    const alcaldes = candidates?.filter((filtro)=> filtro.nomination == "Alcalde Municipal")
    const regidores = candidates?.filter((filtro)=> filtro.nomination == "Regidor Municipal")
    const directoresMun = candidates?.filter((filtro)=> filtro.nomination == "Director Municipal")
    const consejalMun = candidates?.filter((filtro)=> filtro.nomination == "Consejal Distrital")


    console.log(diputados)

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
  <form>
    <div className="card-body">


    


      {/* Select de consejales Distritales */}
      
        <div className="form-group">
        <label>Consejal Distrital</label>
        <select className="custom-select">
          <option>Null</option>
          {
            consejalMun?.map(consejal=>
              <option value={consejal.candidateId}>{consejal.name} | {consejal.partyAcronym}</option>
            )
          }
        </select>
      </div>

      {/* Select de directores Distritales */}
        <div className="form-group">
        <label>Directores distritales</label>
        <select className="custom-select">
          <option>Null</option>
          {
            directoresMun?.map(director=>
              <option value={director.candidateId}>{director.name} | {director.partyAcronym}</option>
            
            )
          }
        </select>
      </div>

      {/* Select regidores municipales */}
      <div className="form-group">
        <label>Regidores Municipales</label>
        <select className="custom-select">
          <option>Null</option>
          {
            regidores?.map(regidor=>
              <option value={regidor.candidateId}>{regidor.name} | {regidor.partyAcronym}</option>
            )
          }
        </select>
      </div>

      {/* select de alcaldes municipales*/}
      <div className="form-group">
        <label>Alcaldes</label>
        <select className="custom-select">
          <option>Null</option>
          {
            alcaldes?.map(alcalde=>
              <option value={alcalde.candidateId}>{alcalde.name} | {alcalde.partyAcronym}</option>
            
            )
          }
        </select>
      </div>

      {/* Select diputados */}
      <div className="form-group">
        <label>Diputados</label>
        <select className="custom-select">
          <option>Null</option>
          {
            diputados?.map(diputado=>
              <option value={diputado.candidateId}>{diputado.name} | {diputado.partyAcronym} </option>
            )
          }
        </select>
    </div> 

      {/*Selec de Senadores */}
      <div className="form-group">
        <label>Senadores</label>
        <select className="custom-select">
          <option>Null</option>
          {
            senadores?.map(senador=>
              <option value={senador.candidateId}>{senador.name} | {senador.partyAcronym}</option>
            
            )
          }
        </select>
      </div>

      {/*Selec de Presidentes */}
      <div className="form-group">
        <label>Presidentes</label>
        <select className="custom-select">
          <option>Null</option>
          {
            presidentes?.map(presidente=>
              <option value={presidente.candidateId}>{presidente.name} | {presidente.partyAcronym}</option>
            
            )
          }
        </select>
      </div>
    </div>
  
    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Guardar</button>
    </div>
  </form> 
</div>

<div className="row mt-4">
  <nav className="w-100">
    <div className="nav nav-tabs" id="product-tab" role="tablist">
      <a className="nav-item nav-link active" id="product-desc-tab" data-toggle="tab" href="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Elector</a>
    </div>
  </nav>

<FormPoll/>
</div>

    </section>
    </div>
    
    <Footer/>
    </>
  )
}
}


export default PollsForm