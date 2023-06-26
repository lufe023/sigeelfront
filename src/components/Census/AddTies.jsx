import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import getConfig from '../../utils/getConfig';
//import "./AdUserToTeams.css"


const AddTies = ({teamId, getOneteam}) => {
    const [results, setResults] = useState([])

    
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




const handleSubmit = (teamId, id) => {
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/${teamId}`;
  const data = { members:[id] };
  
  axios.post(URL, {members:[id]}, getConfig() )
  
    .then(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      getOneteam(teamId)
      Toast.fire({
        icon: 'success',
        title: `fue agregado con éxito`
      });
    })
    .catch(error => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      Toast.fire({
        icon: 'error',
        title: `Hubo un error: `
      });
    });
};


const findingWord = e => {
    const fn = e.target.value.trim()
    findPeople(fn)
    if(fn!=''){
    
}else{
    
}
}
 return (
    <div>
        <div className="form-group">
  <label htmlFor="exampleInputEmail1">Añadir Vinculo</label>
  <input type="text" autoComplete='off' className="form-control" id="exampleInputEmail1" placeholder="Apodo, nombre, apellido o cedula sin guiones" onChange={findingWord}/>
</div>

<ul style={{padding:0}}>
    {
        results?.map(user=>
                <li key={user.id} className={user?.colaborador?.email?'list-select-user-item': 'ist-select-user-item notPosible'}>
                            <div className="user-block list-select-user">
                            <div>
                            <div className="btn-group float-right">
                            <button type="button" className="btn btn-default">Agregar</button>
                            <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                            </button>
                            <div className="dropdown-menu" role="menu" style={{}}>
                              <a className="dropdown-item" href="#">Conyugue</a>
                              <a className="dropdown-item" href="#">Padre/Madre</a>
                              <a className="dropdown-item" href="#">Hermano/Hermana</a>
                              <a className="dropdown-item" href="#">Tío/Tía</a>
                              <a className="dropdown-item" href="#">Primo/Prima</a>
                              <a className="dropdown-item" href="#">Amigo/Amiga</a>
                              <a className="dropdown-item" href="#">Vecino/Vecina</a>
                              <a className="dropdown-item" href="#">Conocido</a>
                            </div>
                          </div>
                            </div>
                                <div>
                                <img className="img-circle img-bordered-sm"
                                src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${user?.picture}`} 
                                alt="user image"
                                style={{width:"70px", height:"70px", marginRight:"5px"}}/>
                            <span className="username">
                            <a href="#">{user.firstName}</a>
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