import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Aside from '../Aside'
import DataProcessor from './AdminUtils/DataProcessor'
import PrecinctForm from './AdminUtils/PrecinctForm'
import CollegeForm from './AdminUtils/CollegeForm'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import DataConsistency from './AdminUtils/DataConsistency'

const SistemConfiguration = () => {
const [precints, setPrecints] = useState()
const [data, setData] = useState()

  const getAllPrecints = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`
      axios.get(URL, getConfig())
      .then(res => {
        setPrecints(res.data.rows)
      })
      .catch(err =>
        console.log(err))
  }



  const getAllData = ()=> {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/dataConsistency`
    axios.get(URL, getConfig())
    .then(res => {
      setData(res.data)
    })
}


  useEffect(() => {
    getAllPrecints()
    getAllData()
  }, [])

  return (
  <>
    <Header/>
    <Aside/>
    <div className='content-wrapper'>
  <section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Panel de Administración</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Administración</a></li>
          <li className="breadcrumb-item active">Panel de Administración</li>
        </ol>
      </div>
    </div>
  </div>{/* /.container-fluid */}
</section>
  <section className="content">
  <div className="container-fluid">
  <div className="row">
  <div className="col-md-12">
  <PrecinctForm getAllPrecints={getAllPrecints}  getAllData={getAllData}/>       
  </div>
  
  </div>
    <div className="row">
      {/*/.col (left) */}
      {/* right column */}
      <div className="col-md-12">
    <CollegeForm precints={precints} getAllPrecints={getAllPrecints} getAllData={getAllData}/>
    </div>

    <div className="col-md-12">
    <DataProcessor precints={precints} getAllPrecints={getAllPrecints} getAllData={getAllData}/>
      </div>
    </div>
    <div className='row'>
    <div className="col-md-12">
      <h1 style={{textAlign:"center"}}>Consistencia de los Datos</h1>
      <DataConsistency getAllData={getAllData} data={data}/>
      </div>
    </div>
  </div>
</section>
</div>
<Footer/>
  </>
  )
}

export default SistemConfiguration