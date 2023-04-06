import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import PeopleCardB from '../Census/PeopleCardB'
import { useParams } from 'react-router-dom'

const PeopleByUser = () => {
    const [results, setResults] = useState()

    const {id} = useParams()

const data = {
    leaderId:id
}

console.log(data)

    const getMypeople = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/peoplebyuser/`
            axios.post(URL,
                data,
            getConfig()
            )
            .then(res => {
                setResults(res.data.rows)
                
        })
        .catch(err =>{
            setResults([])
            console.log(err)
        })
        }

        useEffect(() => {

        getMypeople()
        }, [])
  return (
    <div>
        <Header/>
        <Aside/>
        <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Mi Gente<span style={{fontWeight  :"100", margin:"5px"}}>Luis Fernando</span></h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Mi Gente</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    {/* Default box */}
    
      
        <div className="row">
        
            {
        results?.map((result) => 
        
          <PeopleCardB key={result.id} people={result} getMypeople={getMypeople}/>
          )
        }
      
   {/* /.card */}
    </div>

  </section>

</div>

        <Footer/>
    </div>
  )
}

export default PeopleByUser