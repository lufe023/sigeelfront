import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import PeopleCard from './PeopleCard'

const MyPeople = () => {

    const [results, setResults] = useState()

    const getMypeople = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/mypeople`
            axios.get(URL,
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
          <h1>My Gente</h1>
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
    <div className="card card-solid">
      <div className="card-body pb-0">
        <div className="row">
        
            {
        results?.map((result) => 
          
          <PeopleCard key={result.id} people={result}/>
          )
        }
         
        </div>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        
      </div>
      {/* /.card-footer */}
    </div>
    {/* /.card */}
  </section>
  {/* /.content */}
</div>

        <Footer/>
    </div>
  )
}

export default MyPeople