import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../../utils/getConfig'
import { Link } from 'react-router-dom'
import Radar from './Radar'


const NearbyCitizen = ({citizenId, setPeople}) => {

  const [near, setNear] = useState()
  const [rangeValue, setRangeValue] = useState(100);
  const [radarLoading, setRadarLoading] = useState(true)

  const FindNearbyCitizen = (e)=>{
    e.preventDefault;
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/gps/nearby/${rangeValue}/${citizenId}`
      axios.get(URL, getConfig())
      .then(res => {
        setNear(res.data)
        setRadarLoading(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    FindNearbyCitizen(rangeValue)
    setRadarLoading(true)
  }, [citizenId])

 
  return (
    <>
      <div className="card card-info">
          <div className="card-header">
            <h3 className="card-title"><i className="fas fa-map-marker-alt mr-1"/> Radar de Proximidad </h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          {/* /.card-header */}
          <div className="card-body">
          <div>
            <form onSubmit={FindNearbyCitizen}>
            <div className="form-group">
            <label htmlFor="customRange1">{rangeValue} Metros</label>
            <input
            type="range"
            min="100"
            max="10000"
            className="custom-range"
            value={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
          </div>

        <div className="form-group">
        <button type='submit' className='btn btn-primary' onClick={()=> {setRadarLoading(true), setNear()}}>Encontrar</button>
        </div>
        </form>
    
    </div>

          {
            radarLoading?<Radar/>:""
          }
          <p>
          <i className="fas fa-map-marker-alt mr-1"> {near?(" "+near.length):" "}</i> Personas encontradas
          </p>
          {near?.map(citizen=>
              <div key={citizen?.censusData?.id} className="info-box" style={{maxWidth:"200px", display:"inline-block", textAlign:"center"}}>
              <Link to={`/mypeople/${citizen?.censusData?.id}`} onClick={()=> setPeople()}>
              <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${citizen?.censusData?.picture}`} alt="User Image" className="concurrencia-citizen-image" />
              </Link>
              <div className="info-box-content" >
                <span className="info-box-text">{citizen?.censusData?.firstName} {citizen?.censusData?.lastName}</span>
                <a target='blank'className='btn btn-sm btn-dark'  href={`https://www.google.com/maps/search/${citizen?.latitud},+${citizen?.longitud}?shorturl=1`}>
              Localizar <i className="fas fa-map-marker-alt mr-1" /></a>
              </div>
              </div>
          )
          }
            <hr />
          </div>
        </div>
    </>
  )
}

export default NearbyCitizen