import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import CampainList from './Campains/CampainList'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import CreateCampain from './Campains/CreateCampain'

const Campains = () => {

  const [campains, setCampains] = useState()
  const [isLoadin, setIsloading] = useState()

  const getCampains = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/campains`
        axios.get(URL,
        getConfig()
        )
        .then(res => {
          setCampains(res.data)
            
    })
    .catch(err =>{
        setIsloading(false)
        console.log(err)
    })
    }

    useEffect(() => {

    getCampains()
    }, [])

  return (
    <>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-12">
          <h1 className="m-0">Administrar Campañas</h1>
        </div>{/* /.col */}
        <div className="col-sm-12">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Campañas</li>
            
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
  <div className='row'>
<div className='col-md-12'>
<div className='row'>
  {
        campains?.map((campain) => 
<CampainList key={campain.id} campain={campain} getCampains={getCampains}/>
)}
</div>
</div>
<div className='col-md-12'>
<CreateCampain getCampains={getCampains}/>
</div>

  </div>
  {/* /.error-page */}
</section>

    </div>
    <Footer/>
    </>
  )
}

export default Campains