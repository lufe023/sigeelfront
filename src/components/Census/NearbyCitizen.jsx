import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link } from 'react-router-dom'

const NearbyCitizen = ({citizenId, setPeople}) => {

  const [near, setNear] = useState()

  const NearbyCitizen = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/gps/${citizenId}`
      axios.get(URL, getConfig())
      .then(res => {
        setNear(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    NearbyCitizen()
  }, [citizenId])
  
  return (
    <>
      <div className="card card-warning collapsed-card">
          <div className="card-header">
            <h3 className="card-title"><i className="fas fa-map-marker-alt mr-1" /> Radar de Proximidad</h3>
            <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-plus" />
        </button>
        </div>
          </div>
          {/* /.card-header */}
          <div className="card-body">
          {near?.map(citizen=>
              <div key={citizen?.censusData?.id} className="info-box" style={{maxWidth:"300px"}}>
              
              <Link to={`/mypeople/${citizen?.censusData?.id}`} onClick={()=> setPeople()}>
              <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${citizen?.censusData?.picture}`} alt="User Image" className="concurrencia-citizen-image" />
              </Link>
              <div className="info-box-content" >
                <span className="info-box-text">{citizen?.censusData?.firstName}</span>
                <a target='blank'className='btn btn-sm btn-dark'  href={`https://www.google.com/maps/search/${citizen?.latitud},+${citizen?.longitud}?shorturl=1`}>
              Localizar <i className="fas fa-map-marker-alt mr-1" /></a>
              </div>
              </div>
          )
          }
            <hr />
          
            <strong><i className="far fa-file-alt mr-1" /> Nota</strong>
            <p className="text-muted">Esta es una lista calculada a partir de los registros gps de personas a 500 metros o menos de distancia</p>          
          </div>
          {/* /.card-body */}
        </div>
    </>
  )
}

export default NearbyCitizen