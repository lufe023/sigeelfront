import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import './MyPeoplePrint.css'

const MyPeoplePrintB = () => {


    const [results, setResults] = useState()
    const [currentDate, setCurrentDate] = useState(new Date());
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
          const intervalId = setInterval(() => {
            setCurrentDate(new Date());
          }, 1000); // Actualizar cada segundo

          return () => {
            clearInterval(intervalId);
          };
        }, []);

        useEffect(() => {
        getMypeople()
        }, [])
    return (
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
    Colaborador
    <address>
      <strong>Luis Fernando Gomez Mateo</strong><br />
      Celular: (804) 123-5432<br />
      
    </address>
  </div>
  {/* /.col */}
  <div className="col-sm-4 invoice-col">
    Usuario
    <address>
      <strong>lufe023@gmail.com</strong><br />
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
    
     
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          {
              results?.map((people) =>
          <ul style={{display:"flex", flex: '0 0 calc(10% - 20px)', marginRight: '5px', padding: '5px', border:'solid 1px #000'}}>
          <li>
          <img style={{width:"100px"}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="elector" className="" />
          </li>
          <li style={{width: ' 190px', textAlign:"left", paddingLeft:'5px'}}>
          <b>{people.firstName} {people.lastName}{people.nickname?`(${people.nickname})`:" "}</b><br/>
          {`${people.citizenID.substring(0,3)}-${people.citizenID.substring(3,10)}-${people.citizenID.substring(10,11)}`}<br/>
          Dir: {people.adress}<br/>
          {`Tel:${people.telephone}`}
          <br/>
          {`Cel:${people.celphone}`}
                </li>
          </ul>
              )
          }
          </div>


 
      {/*vista de mapa*/}
  </section>
    </div>
  )
}

export default MyPeoplePrintB
