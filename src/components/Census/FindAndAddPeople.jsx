import axios from 'axios'
import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const FindAndAddPeople = ({getMypeople, leaderId}) => {

    const [isShow, setIsShow] = useState(true)
    const [results, setResults] = useState([])
    const [count, setCount] = useState()
    const [isLoading, setIsloading] = useState(false)


    const addPeople = (people, citizenID, leaderId)=>{
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/addpeopletoother`
      axios.post(URL,
          {
            peopleId:people,
            leaderId
          },
      getConfig(),
      )
      .then(() => {
        findPeople(citizenID)
        getMypeople()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Se agregó una persona a este padroncillo'
        });

  })
  .catch(err =>{
      console.log(err)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
  
      Toast.fire({
        icon: 'error',
        title: `No se pudo agregar`
      });
  })
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
  
<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Buscar y agregar personas</h3>
    <div className="card-tools">
  {/* button with a dropdown */}
  <div className="btn-group">
  </div>
  <button type="button" className="btn btn-sm" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
</div>

  </div>
  {/* /.card-header */}
  <div className="card-body">
  <li className="nav-item">
  <form className="form col-8" style={{margin:'auto'}}>
          <div className="input-group ">
            <input className="form-control form-control-navbar" placeholder="Nombre, Apellido o Cedula" onChange={findingWord}/>
            <div className="input-group-append">
              <button className="btn input-group-text btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>

      
      <div className='' style={{marginTop:"30px"}}>
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
           <span>{people.firstName} {people.lastName} {people.nickname?<small>({people.nickname})</small>: ''}</span>
            </li>
            <li>
            <span></span>
          </li>
          <li>
         <span>{`${people.citizenID.substr(0,3)}-${people.citizenID.substr(3,10)}-${people.citizenID.substr(10,1)}`}</span>
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
          Colegio: <span>{people?.colegio?.collegeNumber.toString().padStart(4, '0')}</span>
          </li>
          <li>
          Recinto: <span>{people?.colegio?.precinctData?.recintoNombre}</span>
          </li>
          <li>
          {  
          people.leaders?
          <Link to={`/mypeople/${ people.leaders.censu.id}`}>
          {people?.leaders?.censu?.firstName}
          </Link>
          :""
          }
          </li>
          </ul>
          
        <div className='card-footer' style={{display: 'flex', justifyContent:'flex-start', gap:'20px' }}>
        <Link to={`/mypeople/${people.id}`}>
        <button className='btn btn-primary'>
        <i className="far fa-eye search-tool "></i>
        </button>
        </Link>
        {people.leader
        ?
        <Link to={`/mypeople/${ people.leaders.censu.id}`} className=' btn btn-default'>
        <i className="fas fa-user-check search-tool less"></i>
        </Link>
        :
        <button className=' btn btn-success ' onClick={()=>addPeople(people.id, people.citizenID, leaderId)}>
            <i className="fas fa-user-plus search-tool" ></i> 
        </button>
            }
        <Link to={`/mypeople/${people.id}`}>
        <button className=' btn btn-warning'>
        <i className="fas fa-user-edit search-tool"></i>
        </button>
        </Link>
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
        </div>

  {/* /.card-body */}
</div>

  )
}

export default FindAndAddPeople