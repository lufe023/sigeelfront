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
          console.log(err)
            setResults([])
            setCount()
        })
        }

    const findingWord = e => {
                const fn = e.target.value.trim()
            
                if(fn!='' && fn.length >= 3){
                  setIsloading(true)
                  findPeople(fn)
            }else{
                setIsloading(false)
                setResults('')
                setCount('')
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
      <table className="table ">
      <thead>
      </thead>
      <tbody>
        {
        results?.map((people)=>
        <tr key={people.id} className="people-finding">
        <td>
        <img style={{float: 'left', width:'125px', marginRight:'5px'}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="message user image"/>
          <ul className='demographic-information' style={{margin:"0", padding:"0"}}>
          <li>
          <span>{people?.firstName} {people?.lastName} {people?.nickname?<small>({people?.nickname})</small>: ''}</span>
            </li>
            <li>
            <span></span>
          </li>
          <li>
          <span>{`${people?.citizenID.substr(0,3)}-${people?.citizenID.substr(3,7)}-${people?.citizenID.substr(10,1)}`}</span>
          </li>
            <li>
              Distritto: <span>{people?.districts?.name} </span>
            </li>
            <li>
              Municipio: <span>{people?.municipalities?.name}</span>
            </li>
            <li>
              Provincia: <span>{people?.provinces?.name} </span>
            </li>
            <li>
          Colegio: <span>{people?.colegio?.collegeNumber.toString().padStart(4, '0')} | {people?.colegio?.id}</span>
          </li>
          <li>
          Recinto: <span>{people?.colegio?.precinctData?.recintoNombre}</span>
          </li>
          <li>
          {  
          people?.leaders?
          <Link to={`/mypeople/${ people?.leaders?.censu?.id}`}>
          {people?.leaders?.censu?.firstName}
          </Link>
          :""
          }
          </li>
          </ul>
          
        <div className='card-footer' style={{display: 'flex', justifyContent:'flex-start', gap:'20px' }}>
        <Link to={`/mypeople/${people?.id}`}>
        <button className='btn btn-primary'>
        <i className="far fa-eye search-tool "></i>
        </button>
        </Link>
        {people?.leader
        ?
        <Link to={`/mypeople/${ people?.leaders?.censu?.id}`} className=' btn btn-default'>
        <i className="fas fa-user-check search-tool less"></i>
        </Link>
        :
        <button className=' btn btn-success ' onClick={()=>addPeople(people?.id, people?.citizenID)}>
            <i className="fas fa-user-plus search-tool" ></i> 
        </button>
            }
        <Link to={`/mypeople/${people?.id}`}>
        <button className=' btn btn-warning'>
        <i className="fas fa-user-edit search-tool"></i>
        </button>
        </Link>
      
        <button className={` btn ${people?.sufragio?.suffrage?'btn-success':'btn-danger' }`}>
        {
          people?.sufragio?.suffrage?"Votó":"No Votó"
        }
            
            </button>
        </div>
        </td>

        </tr>
        )
      }
      </tbody>
      </table>
      : 
      <div>
  <h5>Sin resultados</h5>
  <p>Intente buscar por nombre, apellido o apodo numero de cedula sin los guiones</p>
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