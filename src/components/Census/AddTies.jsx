import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import getConfig from '../../utils/getConfig';
//import "./AdUserToTeams.css"


const AddTies = ({aCitizenId, getTies, setTies}) => {
    const [results, setResults] = useState([])
    const [tiesTypes, setTiesTypes] = useState()

    const getTiesTypes = () => {
      const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/types`
      axios.get(URL,
      getConfig(),
      )
      .then(res => {
        setTiesTypes(res.data.data.rows)
  })
  .catch(err =>{
    console.log(err)
  })

    }
    const findPeople = (findWord)=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/search`
            axios.post(URL,
                {
                  findWord
                },
            getConfig(),
            )
            .then(res => {
                setResults(res.data.data.rows)
        })
        .catch(err =>{
            setResults([])
        })
        }

    const findingWord = e => {
        const fn = e.target.value.trim()
        findPeople(fn)
        if(fn!=''){
        
    }
    }

useEffect(() => {
  getTiesTypes()
}, [])

const addTies = (aCitizenId, bCitizenId, tiesType) => {
  // console.log(aCitizenId)
  // console.log(bCitizenId)
  // console.log(tiesType)
  setTies()
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/${aCitizenId}/${bCitizenId}/${tiesType}`;
    axios
      .post(URL, '', getConfig())
      .then(() => {
        getTies()
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
          title: 'Vinculo Establecido'
        });
  })
  .catch(err =>{
    getTies()
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
      title: `${err.response.data.msg}`
    });
  })
}

return (
    <div>
        <div className="form-group">
  <label htmlFor="exampleInputEmail1">Añadir Vinculo</label>
  <input type="text" autoComplete='off' className="form-control" id="exampleInputEmail1" placeholder="Apodo, nombre, apellido o cedula sin guiones" onChange={findingWord}/>
</div>

<ul style={{padding:0, marginBottom:"20px", backgroundColor:"red", height:'auto'}}>
    {
        results?.map(user=>
                <li key={user.id} className='list-select-user-item'>
                            <div className="user-block list-select-user">
                            <div  >
                            <div className="btn-group float-right">
                            <button type="button" className="btn btn-default">Agregar</button>
                            <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                            </button>
                            <div className="dropdown-menu" role="menu">
                            {
                              tiesTypes?.map(type => 
                                <button key={type.id} className="dropdown-item" onClick={()=> addTies(aCitizenId, user.citizenID, type.id)}>{type.tiesDescription}</button>
                              )
                            }
                              
                            </div>
                          </div>
                            </div>
                                <div>
                                <img className="img-circle img-bordered-sm"
                                src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${user?.picture}`} 
                                alt="user image"
                                style={{width:"70px", height:"70px", marginRight:"5px"}}/>
                            <span className="username">
                            {user.firstName}
                            </span>
                            <span className="description">{user?.districts?.name || user?.municipalities?.name }</span>
                            <span className="description">{user?.adress}</span>
                                </div>
                            
                            </div>
                </li>
)
}
</ul>

    </div>
  )
}

export default AddTies