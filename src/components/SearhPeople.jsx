import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/SearhPeople.css'
import Cargando from '../utils/Cargando'
import getConfig from '../utils/getConfig'

const SearhPeople = () => {
    
    const [isShow, setIsShow] = useState(false)
    const [results, setResults] = useState([])
    const [count, setCount] = useState()
    const [isLoading, setIsloading] = useState(false)

    const addPeople = (people, citizenID)=>{
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/addpeople`
      axios.post(URL,
          {
            peopleId:people 
          },
      getConfig(),
      )
      .then(res => {
        findPeople(citizenID)  
  })
  .catch(err =>{
      console.log(err)
  })
    }
    const show = () => setIsShow(!isShow)

        
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
        })
        }

    const findingWord = e => {
                const fn = e.target.value.trim()
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
      
      <div className='searchBox callout callout-info' style={{display:isShow?'block':'none'}}>
        {
          count? <span className="dropdown-item dropdown-header">{`${count} coincidencia`}</span>:''
        }
      
      <div className='table-responsive p-0 container-table-search'>
        {
        count?
      <table className="table table-striped table-valign-middle">
      <thead>
        <tr>
        <th>Ciudadano</th>
        <th>Demografía</th>
        <th>Herramientas</th>
        </tr>
      </thead>
      <tbody>
        {

        results?.map((people)=>
        <tr key={people.id} className="people-finding">
        <td>
          <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image"/>
          <ul className='demographic-information'>
            <li>
            Nombre: <span>{people.firstName} {people.lastName}</span>
            </li>
            <li>
            {people.nickname?'Le Dicen:':''} <span>{people.nickname?people.nickname: ''}</span>
          </li>
          <li>
            Cedula: <span>{people.citizenID}</span>
          </li>
          <li>
            Edad: <span>{people.age}</span>
          </li>
          <li>
            Género: <span>{people.gender}</span>
          </li>
          </ul>
        </td>


        <td>
          <ul className='demographic-information'>
            <li>
              Distritto: <span>{people.districts.name} </span>
            </li>
            <li>
              Municipio: <span>{people.municipalities.name}</span>
            </li>
            <li>
              Provincia: <span>{people.provinces.name} </span>
            </li>
          </ul>
        </td>
        
        <td>
          <div className='search-tools-box'>
          <Link to={`/mypeople/${people.id}`}>
        <i className="far fa-eye search-tool"></i></Link>
        {people.leader
        ?<i className="fas fa-user-check search-tool less"></i>
        :<i className="fas fa-user-plus search-tool" onClick={()=>addPeople(people.id, people.citizenID)}></i> }
        
        <i className="fas fa-user-edit search-tool"></i>
        </div>
        </td>
        </tr>
        )
      }
      
      </tbody>
      </table>
      : 
      <div className="">
  <h5>Sin resultados</h5>
  <p>Intente buscar por nombre, apellido o numero de cedula sin los guiones</p>
</div>

}
      </div>
     
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
    </li>
  )
}

export default SearhPeople