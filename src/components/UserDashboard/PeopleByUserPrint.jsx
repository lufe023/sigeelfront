import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Header from '../Header'
import Aside from '../Aside'
const PeopleByUserPrint = () => {

    const {id} = useParams()

    const data = {
        leaderId:id
    }

    
    const [results, setResults] = useState()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [links, setLinks] = useState()
    const [isLoading, setIsloading] = useState(true)
    const [user, setUser] = useState()

    const getMypeople = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/peoplebyuser/`
            axios.post(URL,
                data,
            getConfig()
            )
            .then(res => {
                setUser(res.data.user)
                setResults(res.data.rows)
                setIsloading(false)
                setLinks(res.data.ties)
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
      <>
      <Header/>
      <Aside/>
      <div className='content-wrapper'>
    <div className='impresora'>
   
  {
  isLoading?
  <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='1.5'/>
    </div>
    :""
  }
  <section>
    {/* Default box */}
  <div className="row">
  <div className="col-12">
    <h2 className="page-header">
    <img src="img/MIELECTOR-Isotipo-64x75.png" alt="mi elector logo" className="brand-image" />
  Mi Elector
      <small className="float-right">Fecha: {currentDate.toLocaleString()}</small>
    </h2>
  </div>
  {/* /.col */}
</div>
<div className="row">
  <div className="col-sm-4">
    {user?.user_role.roleName}
    <address>
      <strong>{user?.censu?.firstName} {user?.censu?.lastName}</strong><br />
      Celular: {user?.censu?.celphone?.substring(0,3)+'-'+ user?.censu?.celphone?.substring(3,6)+'-'+user?.censu?.celphone?.substring(6,10)}<br />
      
    </address>
  </div>
  {/* /.col */}
  <div className="col-sm-4 invoice-col">
    Usuario
    <address>
      <strong>{user?.email}</strong><br />
      {user?.data?.user?.active?<span className='bg-success'>Activo</span>:<span className='bg-danger'>Desactivado</span>}
    </address>
  </div>
  <div className="col-sm-4 invoice-col">
    Asginados: 
    <address>
      <strong>{results?results.length:0}</strong><br />
    </address>
  </div> 
</div>
<div className='card-footer'>
<div className='col-12'>
<button className='btn btn-info btn-block btn-flat no-print' onClick={window.print}>Imprimir</button>
</div>
</div>
        <div style={{ display: 'flex', flexWrap: 'wrap',}}>
          {
              results?.map((people) =>
          <div key={people.id} style={{
            display:"flex",
            flex: '0 0 calc(10% - 20px)',
            margin: '2px', padding: '5px', 
            border:'solid 1px #000', 
            lineHeight:'17px',
            }}>
            <img style={{width:"100px"}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="Elector"/>
          <ul style={{padding:'0'}}>
          <li style={{width: ' 190px', textAlign:"left", paddingLeft:'5px'}}>
          <b>{people.firstName} {people.lastName}{people.nickname?`(${people.nickname})`:" "}</b><br/>
          {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`} <br/>
          <b>Dir: </b>{people.adress}<br/>
          {
            people.celphone?<span><b>Cel: </b>{people.celphone}<br/></span>:''
          }
          {
            people.telephone?<span><b>Tel: </b>{people.telephone}<br/></span>:''
          }
          <b>Mesa:</b> {people.colegio.collegeNumber.toLocaleString().padStart(4,'0')}<br/>
          <b>Recinto: </b>{people.colegio.precinctData.recintoNombre.substring(0,30)}
          </li>
          </ul>
          </div>
          )
          }
          </div>
          <hr/>
          <h5>Vinculos y Realacionos</h5>
          <div style={{ display: 'flex', flexWrap: 'wrap',}}>
        
            {
            links?.rows?.map((people) =>
            people.bCiticenID === user.censu.citizenID? 
          <div key={people.aties.id} style={{
            display:"flex",
            flex: '0 0 calc(10% - 20px)',
            margin: '2px', padding: '5px', 
            border:'solid 1px #000', 
            lineHeight:'17px',
            }}>
          <img style={{width:"100px"}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.aties.picture}`} alt="Elector"/>
          <ul style={{padding:'0'}}>
          <li style={{width: ' 190px', textAlign:"left", paddingLeft:'5px'}}>
          <b>{people.aties.firstName} {people.aties.lastName}{people.aties.nickname?`(${people.aties.nickname})`:" "}</b><br/>
          {/* {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`} <br/> */}
          <b>Dir: </b>{people.aties.adress}<br/>
          {
            people.aties.celphone?<span><b>Cel: </b>{people.aties.celphone}<br/></span>:''
          }
          {
            people.aties.telephone?<span><b>Tel: </b>{people.aties.telephone}<br/></span>:''
          }
          <b>Mesa:</b> {people.aties.colegio.collegeNumber.toLocaleString().padStart(4,'0')}<br/>
          <b>Recinto: </b>{people.aties.colegio.precinctData.recintoNombre.substring(0,30)}
          </li>
          </ul>
            </div>:
            <div key={people.bties.id} style={{
              display:"flex",
              flex: '0 0 calc(10% - 20px)',
              margin: '2px', padding: '5px', 
              border:'solid 1px #000', 
              lineHeight:'17px',
              }}>
            <img style={{width:"100px"}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.bties.picture}`} alt="Elector"/>
            <ul style={{padding:'0'}}>
            <li style={{width: ' 190px', textAlign:"left", paddingLeft:'5px'}}>
            <b>{people.bties.firstName} {people.bties.lastName}{people.bties.nickname?`(${people.bties.nickname})`:" "}</b><br/>
            {/* {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`} <br/> */}
            <b>Dir: </b>{people.bties.adress}<br/>
            {
              people.bties.celphone?<span><b>Cel: </b>{people.bties.celphone}<br/></span>:''
            }
            {
              people.bties.telephone?<span><b>Tel: </b>{people.bties.telephone}<br/></span>:''
            }
          <b>Mesa:</b> {people.aties.colegio.collegeNumber.toLocaleString().padStart(4,'0')}<br/>
          <b>Recinto: </b>{people.aties.colegio.precinctData.recintoNombre.substring(0,30)}
            </li>
            </ul>
              </div>
            )
            }

          {/* {
              links?.rows?.map((people) =>
          <div key={people.id} style={{
            display:"flex",
            flex: '0 0 calc(10% - 20px)',
            margin: '2px', padding: '5px', 
            border:'solid 1px #000', 
            lineHeight:'17px',
            }}>
            <img style={{width:"100px"}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="Elector"/>
          <ul style={{padding:'0'}}>
          <li style={{width: ' 190px', textAlign:"left", paddingLeft:'5px'}}>
          <b>{people.firstName} {people.lastName}{people.nickname?`(${people.nickname})`:" "}</b><br/>
          {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`} <br/>
          <b>Dir: </b>{people.adress}<br/>
          {
            people.celphone?<span><b>Cel: </b>{people.celphone}<br/></span>:''
          }
          {
            people.telephone?<span><b>Tel: </b>{people.telephone}<br/></span>:''
          }
          <b>Mesa:</b> {people.colegio.collegeNumber.toLocaleString().padStart(4,'0')}<br/>
          <b>Recinto: </b>{people.colegio.precinctData.recintoNombre.substring(0,30)}
          </li>
          </ul>
          </div>
          )
          } */}
          </div>
          <div className='card-footer'>
<div className='col-12'>
<button className='btn btn-info btn-block btn-flat no-print' onClick={window.print}>Imprimir</button>
</div>
</div>
      {/*vista de mapa*/}
  </section>
  
    </div>
    </div>
    </>
  )
}

export default PeopleByUserPrint
