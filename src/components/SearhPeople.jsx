import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Styles/SearhPeople.css'
import Cargando from '../utils/Cargando'
import getConfig from '../utils/getConfig'

const SearhPeople = () => {
    
    const [isShow, setIsShow] = useState(false)
    const [results, setResults] = useState([])
    const [count, setCount] = useState()
    const [isLoading, setIsloading] = useState(false)

    const show = () => setIsShow(!isShow)
    const data = 
        {
            "findWord": "11300054"
        }
    

        
    const findPeople = (findWord)=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/search`
            axios.post(URL,
                {
                    findWord:findWord  
                },
            getConfig(),
            )
            .then(res => {
                setResults(res.data.data.rows)
                setCount(res.data.data.count)
                setIsloading(false)
                
        })
        .catch(err =>{
            setResults([])
            setCount()
            console.log(err)
        })
        }
            const findingWord = e => {
                const fn = e.target.value.trim()
                console.log(fn)
                findPeople(fn)
                if(fn!=''){
                setIsloading(true)
            }else{
                setIsloading(false)
            }
            }
    return (
    
    <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button" onClick={show}>
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Nombre, Apellido o Cedula" aria-label="Search" onChange={findingWord}/>
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search" onClick={show}>
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
       
      </div>
      
      <div className='searchBox' style={{display:isShow?'block':'none'}}>
      <span className="dropdown-item dropdown-header">{count?count+' Coincidencias':''} </span>
        <ul className='findBox'>
        {

count?
        results?.map((people)=>
        <li key={people.id} className="lineDivider">
            <a href="#" className="people-finding">
            <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image"/>
            
            <span>
            {people.firstName} {people.lastName}
            </span>
            <span>
            {people.citizenID}
            </span>

            <span>
            {people.nickname?people.nickname:''}
            </span>

            <span>
            {people.age}
            </span>
            
            <span>
            {people.gender}
            </span>

            
                <span>{people.provinces.name} </span>

                <span>{people.municipalities.name}</span>

                <span>{people.districts.name?people.districts.name: ''}</span>

                
                
            </a>
            
        </li>
        )

    :<li  className="lineDivider"> Sin resultados</li>
       
      }
      </ul>
     
      <div className="dropdown-divider" />
        {
            count?
          
                <a href="#" className="dropdown-item dropdown-footer">Ver todos los resultados</a>
            
                :''
        }
        <div className='loading'>
            {
                isLoading? <Cargando escala='0.3'/>: ''
            }

       
        </div>
      </div>
   
{/*       
      <div className="dropdown-menu show">
        <span className="dropdown-item dropdown-header">15 Notifications</span>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-envelope mr-2" /> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-users mr-2" /> 8 friend requests
          <span className="float-right text-muted text-sm">12 hours</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div> */}
    </li>
   
  )
}

export default SearhPeople