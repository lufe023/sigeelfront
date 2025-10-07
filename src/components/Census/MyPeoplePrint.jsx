import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import PeopleCardPrint from './PeopleCardPrint'
import './MyPeoplePrint.css'

const MyPeoplePrint = () => {


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
    <div>
  
  {
  isLoading?
  <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='1.5'/>
    </div>
    :""
  }
  <section className="invoice">
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
<div className="row invoice-info">
  <div className="col-sm-4 invoice-col">
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
        <div className="row">
        <div className="col-12 table-responsive">
    <table className="table" style={{border:"solid 1px #000"}}>
      <thead>
        <tr>
          <th colSpan={2} >Ciudadano</th>
          <th>Informacion Nueva</th>
          <th>Preferencias</th>
        </tr>
      </thead>
      <tbody>

        {
        results?.map((result) =>
          <PeopleCardPrint key={result.id} people={result} getMypeople={getMypeople}/>
          )
        }

      </tbody>
    </table>
  </div>
    </div>
      {/*vista de mapa*/}
  </section>
    </div>
  )
}

export default MyPeoplePrint
