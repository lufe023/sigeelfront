import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import './MyPeoplePrint.css'
import { useSelector } from 'react-redux';
import Header from '../Header'
import Aside from '../Aside'
const MyPeoplePrintB = () => {

    const [results, setResults] = useState()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsloading] = useState(true)
    const user= useSelector(state=> state.userSlice)
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
{user?.user_role?.roleName}
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
    </address>

  </div>
  {/* /.col */}

  {/* /.col */}   
</div>
<div className='card-footer'>
<div className='col-12'>
<button className='btn btn-info btn-block btn-flat no-print' onClick={window.print}>Imprimir</button>
</div>
</div>
        <div className='print-grid'>
          {
              results?.map((people) =>
          <article key={people.id} className='print-person-card'>
            <img
              className='print-person-card__photo'
              src={people?.picture}
              alt={`Elector ${people?.firstName || ''}`}
            />
            <div className='print-person-card__content'>
              <div className='print-person-card__name'>
                {people.firstName} {people.lastName}{people.nickname ? ` (${people.nickname})` : ''}
              </div>
              <p className='print-person-card__line'>
                {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`}
              </p>
              <p className='print-person-card__line'><b>Dir:</b> {people.adress}</p>
              {
                people.celphone ? <p className='print-person-card__line'><b>Cel:</b> {people.celphone}</p> : ''
              }
              {
                people.telephone ? <p className='print-person-card__line'><b>Tel:</b> {people.telephone}</p> : ''
              }
              <p className='print-person-card__line'>
                <b>Mesa:</b> {people?.colegio?.collegeNumber?.toLocaleString().padStart(4,'0')}
              </p>
              <p className='print-person-card__line'>
                <b>Recinto:</b> {people?.colegio?.precinctData?.recintoNombre?.substring(0,30)}
              </p>
            </div>
          </article>
          )
          }
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

export default MyPeoplePrintB
